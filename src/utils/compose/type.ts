import { AuthenticationRepository } from 'context/authentication/types';
import { BadgesRepository } from 'context/badges/types';
import { DancersRepository } from 'context/dancer/types';
import { DishesRepository } from 'context/dishes/types';
import { EventsRepository } from 'context/events/types';
import { IngredientsRepository } from 'context/ingredients/types';
import { ScoresRepository } from 'context/scores/types';
import { SongsRepository } from 'context/songs/types';
import React from 'react';

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
    | EventsRepository
    | undefined;
}
