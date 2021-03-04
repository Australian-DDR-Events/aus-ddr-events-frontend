import React from 'react';
import { AuthenticationRepository } from 'context/authentication/types';
import { DancersRepository } from 'context/dancer/types';
import { SongsRepository } from 'context/songs/types';
import { ScoresRepository } from 'context/scores/types';
import { IngredientsRepository } from 'context/ingredients/types';
import { DishesRepository } from 'context/dishes/types';
import { BadgesRepository } from 'context/badges/types';

export interface ComposeProps {
  Provider: React.JSXElementConstructor<React.PropsWithChildren<any>>;
  instance?:
    | AuthenticationRepository
    | DancersRepository
    | SongsRepository
    | ScoresRepository
    | IngredientsRepository
    | DishesRepository
    | BadgesRepository
    | undefined;
}
