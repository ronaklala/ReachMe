import React from 'react';

const MessageForm = ({ handleSubmit, text, setText }) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn">Send</button>
    </form>
  );
};

export default MessageForm;
