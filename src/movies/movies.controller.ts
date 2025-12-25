import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAllMovies();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.getMovieById(id);
  }
}
