import React from "react"
import { S as StyledTable } from "./style"
import type { BookSchemaFilledType } from "../../../../validations/BookSchemaFilled"
import { Link } from "react-router-dom"
import { api } from "../../../../config/api"
import { Button } from "../../../../components/Button/style"
export interface TableProps {
    names: Record<string, unknown>
    data: BookSchemaFilledType[]
}
export const Table = ({ names, data }: TableProps) => {

    async function handleDelete(id: string) {
        if (confirm("Deseja deletar o livro?")) {
            try {
                await api.delete(`/${id}`)
                window.location.reload()
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <React.Fragment>
            {data.length > 0 && (
                <table>
                    <thead>
                        <StyledTable.row>
                            {names && Object.entries(names).map(([, v], index) => (
                                <StyledTable.head key={index}>
                                    {v as string}
                                </StyledTable.head>
                            ))}
                        </StyledTable.row>
                    </thead>
                    <tbody>
                        {data.map((v, index) => (
                            <StyledTable.row key={index}>
                                <StyledTable.cell>{v.Id}</StyledTable.cell>
                                <StyledTable.cell>{v.Name}</StyledTable.cell>
                                <StyledTable.cell>{v.Price}</StyledTable.cell>
                                <StyledTable.cell>{v.Category}</StyledTable.cell>
                                <StyledTable.cell>{v.Author}</StyledTable.cell>
                                <StyledTable.cell>
                                    <div className="flex justify-center gap-2">
                                        <Link to={`/edit/${v.Id}`} state={{ data: v }}><img src={"/pen-to-square-solid.svg"} width={20} height={20} /></Link>
                                        <Button className="cursor-pointer border-none bg-transparent p-0" onClick={() => handleDelete(v.Id)}><img src={"/trash-solid.svg"} width={20} height={20} /></Button>
                                    </div>
                                </StyledTable.cell>
                            </StyledTable.row>
                        ))}
                    </tbody>
                </table>
            ) || (
                    <h2 className="center">Não há dados de livros registrados</h2>
                )}

        </React.Fragment>

    )
}