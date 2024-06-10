// src/inversify.config.ts

import { Container } from 'inversify';
import { IHome } from './interface/IHome';
import { homeRepo } from './repositries/homeRepo';
import { HomeController } from './controller/homeController';

const container = new Container();

container.bind<IHome>("IHome").to(homeRepo);
container.bind<HomeController>(HomeController).toSelf();

export { container };
