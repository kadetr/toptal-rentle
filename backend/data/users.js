import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin Rentle',
    email: 'admin@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isAdmin: true,
  },
  {
    name: 'Kemal Deniz',
    email: 'kemal@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isAdmin: true,
  },
  {
    name: 'Anil Caliskan',
    email: 'anil@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@rentle.com',
    password: bcrypt.hashSync('test', 10),
    isRealtor: true,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('test', 10),
  },
]

export default users
