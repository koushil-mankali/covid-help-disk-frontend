import "./introBox.css";

let IntroBox = (props) => {
  return (
    <div className='introBox'>
      <p className='ptab'>Hospital Name: {'name'}</p>
      <p className='ptab'>Address: {'name'}</p>
      <p className='ptab'>Contact Details: {'name'}</p>
    </div>
  );
};

export default IntroBox;
