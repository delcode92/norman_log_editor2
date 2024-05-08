import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { Card, Typography } from "@material-tailwind/react";
import Head from 'next/head';
import DatePicker from "react-datepicker";
import styles from '../styles/tabel.module.css';
import Link from 'next/link';

import "react-datepicker/dist/react-datepicker.css";


const Table = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dataTable, setDataTable] = useState([{id:'', log_time: '', no_perkara: '', namaAsisten: 'John', log_text: '', status: 'Active'}]);

  useEffect(() => {

    const intervalId = setInterval(() => {
    
      fetch("https://www.tangkapdata2.my.id/get_log")
      .then(
        response => response.json()

        )
      .then(
          data => {
            setDataTable(data);
          }
         )
         
        }, 5000);
        
      }, []);

  console.log("data table ========>");
  console.log(dataTable);

  const handleDelete =  async (id: string) => {
    
  };

  const handleOpenModal =  async (id: string) => {
    
  };

  const handleCloseModal =  async () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)  =>  {

  };

  const handleDateChange = (date: Date | null) => {
    if(date==null){
      setStartDate(new Date());
    }else{
      setStartDate(date);
    }
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>tabel LOG</title>
      </Head>

    <h1 className={styles.heading}>LOG ACTIVITY</h1>
    <div>
      <div className={styles.filter}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          type="text"
          placeholder="Search ...."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <DatePicker selected={startDate} onChange={handleDateChange} className={styles.filter_datepicker}/> 

      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>ID Kasus</th>
            <th>Nama Asisten</th>
            <th>Log</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          
          {
            
          dataTable.map((item, index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{new Date(item.log_time).toLocaleString()}</td>
              <td>{item.no_perkara}</td>
              <td>Jhon</td>
              <td>{item.log_text}</td>
              <td>{item.status}</td>
              <td>
              <Link  href="#" rel="noopener noreferrer" onClick={() => handleOpenModal("")}>edit</Link>
                <span> | </span>
                <Link key="" href="#" rel="noopener noreferrer" data-id="" onClick={() => handleDelete("")}> delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
          <form onSubmit={handleSubmit}>
            <button type="button" className={styles.button +" "+ styles.button_close} onClick={handleCloseModal}>Close</button>
          </form>
          </div>
        </div>
      )}


    </div>
    </div>
  );
};

export default Table;