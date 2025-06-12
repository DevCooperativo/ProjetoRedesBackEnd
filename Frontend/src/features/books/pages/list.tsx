import React, { useEffect } from "react"
import { useBookList } from "../hooks/useBookList"
import { Table } from "../components/Table";
import { Link } from "react-router-dom";

export const BooksList = () => {
    const bookList = useBookList();
    useEffect(() => {
        bookList.fetchData()
    })
    return (
        <React.Fragment>
            <div className="w-full">
                <div className="flex justify-end"><Link to={"/create"}><img src={"/square-plus-solid.svg"} width={20} height={20} /></Link></div>
                <div className="flex justify-center">
                    <Table names={{ id: "ID", Name: "Nome", price: "Preço", category: "Categoria", author: "Autor", actions: "Ações" }} data={bookList.data} />
                </div>
            </div>
        </React.Fragment>
    )
}