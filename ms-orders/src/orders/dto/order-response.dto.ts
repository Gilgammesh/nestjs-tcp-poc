import { UserResponseDto } from './user-response.dto';

export interface OrderResponseDto {
  id: number;
  product: string;
  userId: number;
  user: UserResponseDto;
}
