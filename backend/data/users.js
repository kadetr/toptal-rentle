import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin Rentle',
    email: 'admin@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isAdmin: true,
    isRealtor: false,
  },
  {
    name: 'Kemal Deniz',
    email: 'kemal@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isAdmin: true,
    isRealtor: false,
  },
  {
    name: 'Anil Caliskan',
    email: 'anil@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isAdmin: true,
    isRealtor: false,
  },
  {
    name: 'John Doe',
    email: 'john@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isRealtor: true,
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('test', 10),
    isRealtor: false,
    isAdmin: false,
  },
]

export default users
