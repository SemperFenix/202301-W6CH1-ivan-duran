import { useContext } from 'react';
import { PhotosContext } from '../../context/photos.context';
import { Card } from '../../components/card/card';
import { MarsPhotoStructure } from '../../models/marsPhoto';
import './favorites.scss';

export function Favorites() {
  const { state } = useContext(PhotosContext);

  return (
    <>
      <main className="favorites">
        {state?.privatePhotos.map((item: MarsPhotoStructure) => (
          <Card info={item} key={item.id}></Card>
        ))}
      </main>
    </>
  );
}
