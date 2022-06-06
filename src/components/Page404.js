import React from 'react';
import Errors from './Errors';
import './sass/errors.scss';

const Page404 = (props) => {
  let errorcode = props.msg;

  return (
    <>
      {(errorcode === '404' && (
        <Errors
          img="https://firebasestorage.googleapis.com/v0/b/ecommerce-bcfa4.appspot.com/o/product_images%2Fundraw_access_denied_re_awnf.png?alt=media&token=b0be5a03-ed16-47b6-baa2-7a7138a2a004"
          alt="error_img"
          message="The Page you are looking for is not found here"
          code={errorcode}
        />
      )) ||
        (errorcode === '403' && (
          <Errors
            img="https://firebasestorage.googleapis.com/v0/b/ecommerce-bcfa4.appspot.com/o/product_images%2Fundraw_fixing_bugs_w7gi.png?alt=media&token=cb620f43-de00-4c10-9160-90df141ad6b1"
            alt="error_img"
            message="Access Denied"
            code={errorcode}
          />
        )) ||
        (errorcode === '401' && (
          <Errors
            img="https://firebasestorage.googleapis.com/v0/b/ecommerce-bcfa4.appspot.com/o/product_images%2Fundraw_Warning_re_eoyh.png?alt=media&token=1974ddad-12ac-47c4-9f8e-b607a71b875b"
            alt="error_img"
            message="Unauthorized User"
            code={errorcode}
          />
        )) ||
        (errorcode === '500' && (
          <Errors
            img="https://firebasestorage.googleapis.com/v0/b/ecommerce-bcfa4.appspot.com/o/product_images%2Fundraw_QA_engineers_dg5p.png?alt=media&token=32eb19fc-8569-4756-a004-2760367eb652"
            alt="error_img"
            message="Internal Server Error"
            code={errorcode}
          />
        )) ||
        (errorcode === '503' && (
          <Errors
            img="https://firebasestorage.googleapis.com/v0/b/ecommerce-bcfa4.appspot.com/o/product_images%2Fundraw_server_down_s4lk.png?alt=media&token=53b12a36-2b1e-44f2-848a-bff1691ef492"
            alt="error_img"
            message="Service is Unavailable At the Moment Please Try after some time"
            code={errorcode}
          />
        ))}
    </>
  );
};

export default Page404;
