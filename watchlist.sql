-- CineLog - Sistema de Gestão de Filmes
-- Desenvolvido por Alan Filipe Reginato

CREATE DATABASE IF NOT EXISTS cinelog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cinelog;

DROP TABLE IF EXISTS filmes;

CREATE TABLE filmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  diretor VARCHAR(255) NOT NULL,
  ano_lancamento INT NOT NULL,
  genero VARCHAR(100) NOT NULL,
  nota DECIMAL(3,1) NOT NULL CHECK (nota >= 0 AND nota <= 10),
  sinopse TEXT,
  poster_url VARCHAR(500),
  assistido TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO filmes (titulo, diretor, ano_lancamento, genero, nota, sinopse, poster_url, assistido) VALUES
('Clube da Luta', 'David Fincher', 1999, 'Drama/Thriller', 9.5, 'Um homem insatisfeito forma um clube de luta clandestino com um vendedor de sabão carismático.', 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 1),
('Interestelar', 'Christopher Nolan', 2014, 'Ficção Científica', 9.2, 'Um grupo de exploradores viaja por um buraco de minhoca no espaço em busca de um novo lar para a humanidade.', 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 1),
('Parasita', 'Bong Joon-ho', 2019, 'Thriller/Drama', 9.0, 'A família Ki-taek, sem emprego e sem dinheiro, se infiltra na vida da abastada família Park.', 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 1),
('O Poderoso Chefão', 'Francis Ford Coppola', 1972, 'Drama/Crime', 9.8, 'O patriarca de uma dinastia do crime organizado transfere o controle de seu império para seu relutante filho.', 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 1),
('Her', 'Spike Jonze', 2013, 'Drama/Romance', 8.7, 'Um escritor solitário desenvolve uma relação improvável com um sistema operacional projetado para satisfazer cada uma de suas necessidades.', 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg', 1),
('2001: Uma Odisseia no Espaço', 'Stanley Kubrick', 1968, 'Ficção Científica', 9.1, 'Após descobrir um misterioso monólito no solo lunar, uma missão tripulada parte em direção a Júpiter.', 'https://image.tmdb.org/t/p/w500/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg', 0),
('Corra!', 'Jordan Peele', 2017, 'Terror/Thriller', 8.4, 'Um jovem afro-americano visita a família de sua namorada branca e descobre algo perturbador.', 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg', 1),
('Whiplash', 'Damien Chazelle', 2014, 'Drama/Música', 8.9, 'Um jovem baterista ambicioso busca perfeição sob a orientação de um professor exigente e cruel.', 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg', 1);
