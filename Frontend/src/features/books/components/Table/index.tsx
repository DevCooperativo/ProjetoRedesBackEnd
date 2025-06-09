import React from "react"
import { S as StyledTable } from "./style"
export interface TableProps<T> {
    names: Record<string, unknown>
    data: T[]
}
export const Table = <T,>({ names, data }: TableProps<T>) => {
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
                                <StyledTable.cell>{v as string | number}</StyledTable.cell>
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