export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categpry: string;
  image: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}
