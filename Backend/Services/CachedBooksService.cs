using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using ProjetoRedesBackEnd.Interfaces;
using ProjetoRedesBackEnd.Models;

namespace ProjetoRedesBackEnd.Services;

public class CachedBooksService(IBooksService service, IDistributedCache cache) : IBooksService
{
    private static readonly string AllBooksCacheKey = "books:all";
    private static readonly DistributedCacheEntryOptions CacheOptions = new()
    {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
    };

    public async Task CreateAsync(Book newBook)
    {
        await service.CreateAsync(newBook);

        await cache.SetStringAsync(GetBookCacheKey(newBook.Id ?? throw new Exception("Couldn't find book")), JsonSerializer.Serialize(newBook), CacheOptions);

        await cache.RemoveAsync(AllBooksCacheKey);
    }

    public async Task<List<Book>> GetAsync()
    {
        var cached = await cache.GetStringAsync(AllBooksCacheKey);
        if (cached is not null)
        {
            return JsonSerializer.Deserialize<List<Book>>(cached)!;
        }

        var books = await service.GetAsync();

        await cache.SetStringAsync(AllBooksCacheKey, JsonSerializer.Serialize(books), CacheOptions);

        return books;
    }

    public async Task<Book?> GetAsync(string id)
    {
        var key = GetBookCacheKey(id);
        var cached = await cache.GetStringAsync(key);
        if (cached is not null)
        {
            return JsonSerializer.Deserialize<Book>(cached);
        }

        var book = await service.GetAsync(id);

        if (book is not null)
        {
            await cache.SetStringAsync(key, JsonSerializer.Serialize(book), CacheOptions);
        }

        return book;
    }

    public async Task RemoveAsync(string id)
    {
        await service.RemoveAsync(id);

        await cache.RemoveAsync(GetBookCacheKey(id));
        await cache.RemoveAsync(AllBooksCacheKey);
    }

    public async Task UpdateAsync(string id, Book updatedBook)
    {
        await service.UpdateAsync(id, updatedBook);

        await cache.SetStringAsync(GetBookCacheKey(id), JsonSerializer.Serialize(updatedBook), CacheOptions);
        await cache.RemoveAsync(AllBooksCacheKey);
    }

    private static string GetBookCacheKey(string id) => $"books:{id}";
}