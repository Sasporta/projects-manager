'use client';

import { useDispatch } from 'react-redux';

import { MODAL_TYPE } from '#fe/consts';
import { setModal } from '#slices/modal';
import ActionButton from '../shared/actionButton';

const images = {
  add: 'https://uploads-ssl.webflow.com/6488434242d07f8e8d4f615f/64886ca5bd8c1f835e1aca3c_icons8-plus-30.png',
};

function AddButton() {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setModal({ type: MODAL_TYPE.create, project: null }));
  };

  return (
    <ActionButton src={images.add} onClick={onClick} tooltip={'Add project'} />
  );
}

export default AddButton;
