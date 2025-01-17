import { useCallback, useReducer, useEffect } from 'react';
import { photosReducer } from '../reducer/photos.reducer';
import { NasaApiRepo } from '../services/repository/nasa.api.repo';

import * as ac from '../reducer/photos.actions.creator';
import { PrivateApiRepo } from '../services/repository/private.api.repo';
import { MarsPhotoStructure } from '../models/marsPhoto';

export type UseMarsStructure = ReturnType<typeof usePhotos>;

type CustomHookStructure = {
  publicRepo: NasaApiRepo;
  privateRepo: PrivateApiRepo;
};

export type InitialStateStructure = {
  photos: MarsPhotoStructure[];
  actualPhoto: MarsPhotoStructure;
  privatePhotos: MarsPhotoStructure[];
};

export function usePhotos(repo: CustomHookStructure) {
  const initialState: InitialStateStructure = {
    photos: [],
    actualPhoto: {
      id: 1,
      sol: 1,
      camera_id: 1,
      camera_name: '',
      camera_rover_id: 1,
      camera_full_name: '',
      img_src: '',
      earth_date: '',
      rover_id: 1,
      rover_name: '',
      rover_landing_date: '',
      rover_launch_date: '',
      rover_status: '',
      apiOrigin: '',
      isFavorite: false,
      favoriteName: 'No actual Card',
    },
    privatePhotos: [],
  };
  const [state, dispatch] = useReducer(photosReducer, initialState);

  const handlerError = (error: Error) => {
    console.log(error.message);
  };

  const loadPhotos = useCallback(
    async (camera?: string) => {
      try {
        const photos = await repo.publicRepo.loadPhotos(camera);
        dispatch(ac.loadPhotosCreator(photos));
      } catch (error) {
        handlerError(error as Error);
      }
    },
    [repo]
  );

  const actualCard = useCallback((card: MarsPhotoStructure) => {
    dispatch(ac.actualCardCreator(card));
  }, []);

  const loadPrivatePhotos = useCallback(async () => {
    try {
      const photos = await repo.privateRepo.loadPrivatePhotos();
      dispatch(ac.loadPrivatePhotosCreator(photos));
    } catch (error) {
      handlerError(error as Error);
    }
  }, [repo]);

  const createPhoto = async (photo: MarsPhotoStructure) => {
    try {
      photo.isFavorite = true;
      const finalPhoto = await repo.privateRepo.createPrivatePhoto(photo);
      dispatch(ac.createPhotoCreator(finalPhoto));
    } catch (error) {
      handlerError(error as Error);
    }
  };

  useEffect(() => {
    loadPhotos();
    loadPrivatePhotos();
  }, [loadPhotos, loadPrivatePhotos]);

  return {
    state,
    loadPhotos,
    actualCard,
    loadPrivatePhotos,
    createPhoto,
  };
}
