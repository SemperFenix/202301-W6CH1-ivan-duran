import { useContext } from 'react';
import { PhotosContext } from '../../context/photos.context';
import { Card } from '../../components/card/card';
import { Filter } from '../../components/filter.desktop/filter.desktop';
import { MarsPhotoStructure } from '../../models/marsPhoto';
import { FilterMobile } from '../filter.mobile/filter.mobile';
import './gallery.scss';

export function Gallery() {
  const { state } = useContext(PhotosContext);

  return (
    <main className="gallery-page">
      <Filter></Filter>
      <FilterMobile></FilterMobile>
      <section className="gallery">
        {state?.photos.map((item: MarsPhotoStructure) => (
          <Card info={item} key={item.id}></Card>
        ))}
      </section>
    </main>
  );
}
