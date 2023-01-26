import React from 'react'
import $ from 'jquery'
import { useRef,useEffect,props } from 'react'

export default function MyTable() {
    $.DataTable = require('datatables.net')
const tableRef = useRef()
// console.log(tableRef)
const tableName = "table1"
 
useEffect(() => {
    console.log(tableRef.current)
    const table = $(`#${tableName}`).DataTable(
        {
            
                columns: [
                    { title: "Name"},
                    { title: "Position"},
                ],
                destroy: true,  // I think some clean up is happening here
                searching: true
        }
    )
    // Extra step to do extra clean-up.
    return function() {
        console.log("Table destroyed")
        table.destroy()
    }
},[])
  return (
    <div>
            <table className="display" width="100%" id={tableName}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Afnan</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Afnan</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Afnan yousuf</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Afnan</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Afnan</td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}
