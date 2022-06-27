import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';



const searchType = [
    {
      value: 'Nom',
      label: 'Nom',
    },
    {
      value: 'Classification',
      label: 'Classification',
    },
    {
      value: 'OMIMID',
      label: 'Omim Id',
    },
    {
      value: 'Gene',
      label: 'Gene',
    },
    {
        value: 'TransmissionMode',
        label: 'mode de transmission',
      },
      {
        value: 'icd10Code',
        label: 'ICD10 Code',
      },
  ];
function MaladiePageList() {

    const [ListMaladie, setListMaladie] = useState<any>([])
    const [filtredList, setFiltredList] = useState([])
    const [searchValue, setsearchValue] = useState<string>('')
    const [searchMode, setSearchMode] = useState<string>('Nom')

    useEffect(() => {
      console.log("***********",searchValue,"*********");
      console.log("***********",searchMode,"*********");
      search()
    }, [searchValue])

    
    const search = async ()=>{
      if(searchValue.length===0){
        setFiltredList(ListMaladie)
      }
      else if(searchMode === "Nom" && searchValue.length>0  ){
        let afterSearch:any={}
        afterSearch = await ListMaladie.filter((maladie:any) => maladie?.name?.toLowerCase().includes(searchValue.toLowerCase()))
        await setFiltredList(afterSearch)
      }
      else if(searchMode === "OMIMID" && searchValue.length>0  ){
        let afterSearch:any={}
        afterSearch = await ListMaladie.filter((maladie:any) => maladie?.omimId?.toLowerCase().includes(searchValue.toLowerCase()))
        await setFiltredList(afterSearch)
      }
      else if(searchMode === "Gene" && searchValue.length>0  ){
        let afterSearch:any={}
        afterSearch = await ListMaladie.filter((maladie:any) => maladie?.geneSymbol?.toLowerCase().includes(searchValue.toLowerCase()))
        await setFiltredList(afterSearch)
      }
      else if(searchMode === "icd10Code" && searchValue.length>0  ){
        let afterSearch:any={}
        afterSearch = await ListMaladie.filter((maladie:any) => maladie?.icd10Code?.toLowerCase().includes(searchValue.toLowerCase()))
        await setFiltredList(afterSearch)
      }
    }
    


    useEffect(() => {
      init()
    }, [])

  useEffect(() => {
      setFiltredList(ListMaladie)
    }, [ListMaladie])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchMode(event.target.value);
    };

    const init =()=>{
        axios.get("http://localhost:3100/api/disease/getAll")
        .then((response) =>{
            setListMaladie(response.data)
        })
    }

  

  return (
    <div style={{margin:"auto" , maxWidth:"1200px"}}>
      <div style={{paddingTop:"70px"}}>
        <h2 style={{alignContent:"center"}}>Maladie</h2>
      </div>
      <div>
        <div>
          
      <div  style={{margin:"auto" , maxWidth:"1200px" ,  flexDirection: "row" ,  display:"flex" , justifyContent:"flex-end"}} >
        <div>
      <TextField
          id="standard-select-currency-native"
          select
          value={searchMode}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          
          variant="standard"
        >
          {searchType.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        </div>
        
        <div style={{paddingLeft:"10px"}}>
      <TextField
          id="standard-size-normal"
          defaultValue=""
          variant="standard"
          onChange={(e:any)=>{setsearchValue(e.target.value)}}
        />
        </div>
      </div>
        </div>
      <div style={{paddingTop:"70px"}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell align="center">omimId</TableCell>
            <TableCell align="center">symbole</TableCell>
            <TableCell align="center">géne</TableCell>
            <TableCell align="center">autre Nom</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {  filtredList?.map((row:any) => (
            <TableRow
              key={row?.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row?.omimId}</TableCell>
              <TableCell align="center">{row?.symbol}</TableCell>
              <TableCell align="center">{row?.geneSymbol}</TableCell>
              <TableCell align="center">{row?.othername}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
      </div>
    </div>
  )
}

export default MaladiePageList