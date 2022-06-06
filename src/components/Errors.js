import React from 'react'

const Errors = (props) => {
  return (
    <>
    <section className='error-section'>
        <div className='container'>
            <div className='error-left'>
              <img src = {props.img} alt = {props.alt} />
            </div>
            <div className='error-right'>
                <span className='text-404'>{props.code}</span>
                <span>{props.message}</span>
                <br />
                <a href = "/"><button>Go Back To Home</button></a>
            </div>
          </div>
      </section>
    </>
  )
}

export default Errors