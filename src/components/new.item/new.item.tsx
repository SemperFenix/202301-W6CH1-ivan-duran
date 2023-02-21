import React from 'react';
import { SyntheticEvent, useContext, useRef } from 'react';
import { PhotosContext } from '../../context/photos.context';
import { MarsPhotoStructure } from '../../models/marsPhoto';

export function NewItem() {
  const { state, createPhoto } = useContext(PhotosContext);
  const formNewPhotoRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formNewPhoto = formNewPhotoRef.current as HTMLFormElement;
    const newId = Math.max(...state.privatePhotos.map((item) => item.id));
    const newPhoto: MarsPhotoStructure = {
      id: newId + 1,
      sol: 1,
      camera_id: 1,
      camera_name: (formNewPhoto[4] as HTMLInputElement).value,
      camera_rover_id: 1,
      camera_full_name: (formNewPhoto[4] as HTMLInputElement).value,
      img_src:
        'https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG',
      earth_date: (formNewPhoto[1] as HTMLInputElement).value,
      rover_id: 1,
      rover_name: (formNewPhoto[5] as HTMLInputElement).value,
      rover_landing_date: (formNewPhoto[3] as HTMLInputElement).value,
      rover_launch_date: (formNewPhoto[2] as HTMLInputElement).value,
      rover_status: '',
      apiOrigin: '',
      isFavorite: false,
      favoriteName: (formNewPhoto[0] as HTMLInputElement).value,
    };
    const dialog = document.querySelector('dialog');
    createPhoto(newPhoto);
    formNewPhoto.reset();
    (dialog as unknown as HTMLDialogElement).showModal();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        data-testid="photo-form"
        ref={formNewPhotoRef}
      >
        <input type="text" placeholder="Photo name" required />
        <input type="text" placeholder="Photo date" required />
        <input type="text" placeholder="Launch date" required />
        <input type="text" placeholder="Landing date" required />
        <input type="text" placeholder="Camera used" required />
        <input type="text" placeholder="Rover name" required />
        <input type="button" value="Enviar"></input>
      </form>
      <dialog className="dialog">¡Elemento creado!</dialog>
    </>
  );
}
