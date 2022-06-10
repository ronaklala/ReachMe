import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Transcation.css';
const Transcation = () => {
    let [loading, setLoading] = useState(true);
    const [trans, settran] = useState([]);
    const wallet = useParams();
    useEffect(() => {
        gettrans();
      }, []);
      const gettrans = async () => {
        await axios.get('http://localhost:5001/transcation/' + wallet.uid).then((res) => {
          setLoading(false);
          settran(res.data.doc);
          console.log(trans);
        });
      };
    
  return (
    <>
    {trans.length == 0 ? (
                <>
                <div style={{height:"54px",width:"19vw",backgroundColor:"#fff",textAlign:"center",display:"flex",borderRadius:"10px",marginLeft:"auto",marginRight:"auto",marginTop:"20%",padding:"130px", justifyContent:"center",alignItems:"center"}}>

                  <h1>No Transcation Found For this user</h1>
                  </div>
                </>
              ) :(
    <table>
  <thead>
    <tr>
      <th scope="col">from</th>
      <th scope="col">to</th>
      <th scope="col">eth</th>
      <th scope="col">Transcation-type</th>
    </tr>
  </thead>
  <tbody>
  {trans.map((post, id) => (
    <tr>
      <td style={{wordBreak: "break-word",
    lineBreak: "auto",
    textAlign:"left",
    whiteSpace: "pre-line"
}} data-label="from">&nbsp;{post.from}</td>
      <td style={{wordBreak: "break-word",
    lineBreak: "auto",
    textAlign:"left",
    whiteSpace: "pre-line"
}} data-label="to">&nbsp; {post.to}</td>
      <td style={{wordBreak: "break-word",
    lineBreak: "auto",
    textAlign:"left",
    whiteSpace: "pre-line"
}} data-label="eth">&nbsp;{post.eth}</td>
      <td style={{wordBreak: "break-word",
    lineBreak: "auto",
    textAlign:"left",
    whiteSpace: "pre-line"
}} data-label="Transcation-type">&nbsp; {post.txntype}</td>
    </tr>
    ))}
    
  </tbody>
</table>)}
    </>
  )
}

export default Transcation