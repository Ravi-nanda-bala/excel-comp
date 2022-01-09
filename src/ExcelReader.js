import { AppBar } from '@material-ui/core';
import React, { useState } from 'react';
import "./App.css";
import * as XLSX from 'xlsx';
import Table from './App.js'

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: '',
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

   readFile() {
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log('Data>>>' + data);
      // shows that excel data is read
      // const sheet = this.convertToJson(data); // shows data in json format
      const sheet = XLSX.utils.sheet_to_json(ws, { header: 0 });
      console.log(sheet);
      
      console.log(sheet.length);

    };
    reader.readAsBinaryString(f);
  }


  render() {
    return (
      <div className="sheet">
        <input
          type="file"
          id="file"
          ref="fileUploader"
          onChange={this.filePathset.bind(this)}
        />
        <button
          onClick={() => {
            this.readFile();
          }}
        >
          Read File
        </button>
      </div>

    );
  }
}







export default ExcelToJson;