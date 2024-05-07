import React, { useState, useEffect } from 'react';

const Test = () => {

    const [dataTable, setDataTable] = useState([{id:'', log_time: '', no_perkara: '', namaAsisten: 'John', log_text: '', status: 'Active'}]);

    useEffect(() => {

        // const intervalId = setInterval(() => {
        
          fetch("https://www.tangkapdata2.my.id/get_log/101")
          .then(
            response => response.json()
    
            )
          .then(
              data => {
                setDataTable(data);
              }
             )
             
            // }, 2000);
            
          }, []);

          console.log("data table ========>");
  console.log(dataTable);
}


export default Test;