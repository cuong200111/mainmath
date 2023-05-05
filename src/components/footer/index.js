import { Grid } from '@mui/material'
import React from 'react'

const Footer = () => {
  const col1 = [{ link: "#", title: "1234 Street Name, City Name, United States" }, { link: "#", title: "+1 123 456 7890" }, {link:"#",title:"https://www.facebook.com/yourfanpage"}]
  const col2 = [{ path: "", title: "Home" }, { path: "", title: "About Us" }, { path: "", title: "Contact Us" }]
  return (
    <div className='footer'>
      <Grid container className='footer_container'>

        <Grid className='footer_container_col1'>
          {col1.map((item, index) => (<div key={index}>
            {item.title}
          </div>))}
        </Grid>
        <Grid className='footer_container_col2'>
          {col2.map((item, index) => (
            <div key={index}>
              {item.title}
            </div>)
          )

          }
        </Grid>
      </Grid>



    </div>
  )
}

export default Footer