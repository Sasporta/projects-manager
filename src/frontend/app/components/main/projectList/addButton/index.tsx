'use client';

import ActionButton from '../../../shared/actionButton';

const images = {
  add: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886ca5bd8c1f835e1aca3c_icons8-plus-30.png',
};

function AddButton(): JSX.Element {
  const onClick = () => {
    // TODO: Add onClick functionality
  };

  return <ActionButton src={images.add} onClick={onClick} />;
}

export default AddButton;
