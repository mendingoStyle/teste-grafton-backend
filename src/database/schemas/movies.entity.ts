import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('movies')
export class Movies {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  image: string

  @Column()
  realeaseYear: string

  @Column()
  director: string

  @Column()
  producer: string

  @Column()
  description: string

}


