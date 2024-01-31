import { Request, Response } from "express";
import { prisma } from "../database";

export default {
    async createUser(request: Request, response: Response) {
        try {
            const { name, email, phone } = request.body;

            const userExist = await prisma.user.findUnique({ where: { email }});
            if (userExist) {
                return response.status(400).json({
                    error: true,
                    message: 'Error: An user with this email already exists.'
                });
            }

            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    phone: phone
                }
            });

            return response.status(201).json({user});

        }catch(error){
            return response.status(500).json({message: error.message});
        }
    },

    async listUsers (request: Request, response: Response) {
        try {
            const users = await prisma.user.findMany({
                where: {
                    deleted_at: null,
                },
                orderBy: {
                    created_at: 'desc'
                }
            });

            if (!users) {
                return response.status(204).json({
                    error: false,
                    message: 'No users found.'
                })
            }

            return response.status(200).json(users)

        } catch (error) {
            return response.status(500).json({message:error.message})
        }
    },

    async findUser (request: Request, response: Response) {
        try {
            const { id } = request.params;
        
        const user = await prisma.user.findUnique( { where: {id: Number(id), deleted_at: null} } );

        if (!user) {
            return response.json({
                error: true,
                message: 'Error: User with given ID not found.'
            });
        }

        return response.json({
            error: false,
            user
        });

        } catch(error) {
            return response.json({message: error.message});
        }
    },

    async updateUser (request: Request, response: Response) {
        try {

            const { id, name, email, phone} = request.body;

            const userExist = await prisma.user.findUnique( { where: {id: Number(id),deleted_at: null} } );

            if (!userExist) {
                return response.json({
                    error: true,
                    message: 'Error: User with given ID not found.'
                });
            }

            const user = await prisma.user.update({
                where: {
                    id: Number(request.body.id),
                    deleted_at: null
                }, 
                data: {
                    name,
                    email,
                    phone
                }
            });

            return response.json({
                error: false,
                message: 'Success: User successfully edited.',
                user
            });

        } catch (error) {
            return response.json({message: error.message});
        }
    },

    async deleteUser (request: Request, response: Response) {
        const { id } = request.params;
        const user = await prisma.user.delete({
            where: { id: Number(id), deleted_at: null }
        });
        response.status(200).json({
            error: false,
            message: 'Success: User successfully deleted.',
        })
    },
    
    async searchUsers (request: Request, response: Response) {
        try {
            const { name } = request.params;

            const searchedUsers = await prisma.user.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    },
                    deleted_at: null
                }
            });

            response.status(200).json(searchedUsers)

        } catch(error) {
            return response.status(500).json({message:error.message})
        }
    },

    async filterUsers (request: Request, response: Response) {
        try {
            const { sortBy, filterStart, filterEnd } = request.query;

            if (sortBy==='createdDes'){
                const filteredUsers = await prisma.user.findMany({
                    where: {
                        created_at: {
                            gte: typeof(filterStart)==='string'? new Date(filterStart).toISOString() : undefined,
                            lte: typeof(filterEnd)==='string'? new Date(filterEnd).toISOString() : undefined , 
                        },
                        deleted_at: null
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                })
                response.status(200).json(filteredUsers)
            } else if (sortBy === 'createdAsc') {
                const filteredUsers = await prisma.user.findMany({
                    where: {
                        created_at: {
                            gte: typeof(filterStart)==='string'? new Date(filterStart).toISOString() : undefined,
                            lte: typeof(filterEnd)==='string'? new Date(filterEnd).toISOString() : undefined , 
                        },
                        deleted_at: null
                    },
                    orderBy: {
                        created_at: 'asc'
                    }
                })
                response.status(200).json(filteredUsers)
            } else if (sortBy === 'updatedDes') {
                const filteredUsers = await prisma.user.findMany({
                    where: {
                        created_at: {
                            gte: typeof(filterStart)==='string'? new Date(filterStart).toISOString() : undefined,
                            lte: typeof(filterEnd)==='string'? new Date(filterEnd).toISOString() : undefined , 
                        },
                        deleted_at: null
                    },
                    orderBy: {
                        updated_at: 'desc'
                    }
                })
                response.status(200).json(filteredUsers)
            } else if (sortBy === 'updatedAsc') {
                const filteredUsers = await prisma.user.findMany({
                    where: {
                        created_at: {
                            gte: typeof(filterStart)==='string'? new Date(filterStart).toISOString() : undefined,
                            lte: typeof(filterEnd)==='string'? new Date(filterEnd).toISOString() : undefined , 
                        },
                        deleted_at: null
                    },
                    orderBy: {
                        updated_at: 'asc'
                    }
                })
                response.status(200).json(filteredUsers)
            }

                  

        } catch(error) {
            return response.status(500).json({message:error.message})
        }
    }
}