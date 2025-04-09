export interface User {
    id: string; // Unique identifier for the user - UUID4
    name: string; // Full name of the user
    email: string; // Email address of the user
    phone: string; // Phone number of the user
    createdAt: string; // Date and time when the user was created - ISO 8601 format
    updatedAt: string; // Date and time when the user was last updated - ISO 8601 format
    isOnline: boolean; // Indicates if the user is currently online
}

export const data: User[] = [
    {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        createdAt: "2023-01-15T08:30:00Z",
        updatedAt: "2023-04-20T14:45:00Z",
        isOnline: true
    },
    {
        id: "7c0f2d4a-9c5b-4b9c-8d9a-8f9a5b6c7d8e",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "555-234-5678",
        createdAt: "2023-02-10T10:15:00Z",
        updatedAt: "2023-05-12T11:20:00Z",
        isOnline: false
    },
    {
        id: "a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6",
        name: "Michael Johnson",
        email: "michael.j@example.com",
        phone: "555-345-6789",
        createdAt: "2023-01-22T09:45:00Z",
        updatedAt: "2023-05-18T16:30:00Z",
        isOnline: true
    },
    {
        id: "f6e5d4c3-b2a1-0f9e-8d7c-6b5a4c3d2e1f",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "555-456-7890",
        createdAt: "2023-03-05T14:20:00Z",
        updatedAt: "2023-04-28T09:10:00Z",
        isOnline: false
    },
    {
        id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        name: "Robert Wilson",
        email: "robert.w@example.com",
        phone: "555-567-8901",
        createdAt: "2023-02-18T11:35:00Z",
        updatedAt: "2023-05-01T13:25:00Z",
        isOnline: true
    },
    {
        id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        name: "Sophia Brown",
        email: "sophia.brown@example.com",
        phone: "555-678-9012",
        createdAt: "2023-03-12T15:40:00Z",
        updatedAt: "2023-05-10T10:50:00Z",
        isOnline: false
    },
    {
        id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        name: "Liam Martinez",
        email: "liam.martinez@example.com",
        phone: "555-789-0123",
        createdAt: "2023-01-25T12:00:00Z",
        updatedAt: "2023-04-15T14:10:00Z",
        isOnline: true
    },
    {
        id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
        name: "Olivia Garcia",
        email: "olivia.garcia@example.com",
        phone: "555-890-1234",
        createdAt: "2023-02-05T09:25:00Z",
        updatedAt: "2023-05-05T16:45:00Z",
        isOnline: false
    },
    {
        id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        name: "Noah Rodriguez",
        email: "noah.rodriguez@example.com",
        phone: "555-901-2345",
        createdAt: "2023-03-18T13:15:00Z",
        updatedAt: "2023-05-08T11:30:00Z",
        isOnline: true
    },
    {
        id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
        name: "Emma Hernandez",
        email: "emma.hernandez@example.com",
        phone: "555-012-3456",
        createdAt: "2023-01-30T10:50:00Z",
        updatedAt: "2023-04-25T12:40:00Z",
        isOnline: false
    },
    {
        id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
        name: "William Moore",
        email: "william.moore@example.com",
        phone: "555-123-4567",
        createdAt: "2023-02-12T14:30:00Z",
        updatedAt: "2023-05-02T15:20:00Z",
        isOnline: true
    },
    {
        id: "8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
        name: "Ava Taylor",
        email: "ava.taylor@example.com",
        phone: "555-234-5678",
        createdAt: "2023-03-22T11:10:00Z",
        updatedAt: "2023-05-12T13:35:00Z",
        isOnline: false
    },
    {
        id: "9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
        name: "James Anderson",
        email: "james.anderson@example.com",
        phone: "555-345-6789",
        createdAt: "2023-01-18T08:20:00Z",
        updatedAt: "2023-04-18T09:50:00Z",
        isOnline: true
    },
    {
        id: "0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5g",
        name: "Isabella Thomas",
        email: "isabella.thomas@example.com",
        phone: "555-456-7890",
        createdAt: "2023-02-28T16:00:00Z",
        updatedAt: "2023-05-01T17:25:00Z",
        isOnline: false
    },
    {
        id: "1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5g6h",
        name: "Benjamin Jackson",
        email: "benjamin.jackson@example.com",
        phone: "555-567-8901",
        createdAt: "2023-03-10T14:45:00Z",
        updatedAt: "2023-05-06T15:55:00Z",
        isOnline: true
    },
    {
        id: "2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5g6h7i",
        name: "Mia White",
        email: "mia.white@example.com",
        phone: "555-678-9012",
        createdAt: "2023-01-20T09:30:00Z",
        updatedAt: "2023-04-20T10:40:00Z",
        isOnline: false
    },
    {
        id: "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5g6h7i8j",
        name: "Lucas Harris",
        email: "lucas.harris@example.com",
        phone: "555-789-0123",
        createdAt: "2023-02-15T12:20:00Z",
        updatedAt: "2023-05-03T14:30:00Z",
        isOnline: true
    },
    {
        id: "4b5c6d7e-8f9a-0b1c-2d3e-4f5g6h7i8j9k",
        name: "Charlotte Martin",
        email: "charlotte.martin@example.com",
        phone: "555-890-1234",
        createdAt: "2023-03-25T10:15:00Z",
        updatedAt: "2023-05-09T11:25:00Z",
        isOnline: false
    },
    {
        id: "5c6d7e8f-9a0b-1c2d-3e4f-5g6h7i8j9k0l",
        name: "Elijah Thompson",
        email: "elijah.thompson@example.com",
        phone: "555-901-2345",
        createdAt: "2023-01-28T13:50:00Z",
        updatedAt: "2023-04-28T15:10:00Z",
        isOnline: true
    },
    {
        id: "6d7e8f9a-0b1c-2d3e-4f5g-6h7i8j9k0l1m",
        name: "Amelia Martinez",
        email: "amelia.martinez@example.com",
        phone: "555-012-3456",
        createdAt: "2023-02-08T11:40:00Z",
        updatedAt: "2023-05-04T13:20:00Z",
        isOnline: false
    },
    {
        id: "7e8f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n",
        name: "Logan Clark",
        email: "logan.clark@example.com",
        phone: "555-123-4567",
        createdAt: "2023-03-15T14:25:00Z",
        updatedAt: "2023-05-07T16:35:00Z",
        isOnline: true
    },
    {
        id: "8f9a0b1c-2d3e-4f5g-6h7i-8j9k0l1m2n3o",
        name: "Harper Lewis",
        email: "harper.lewis@example.com",
        phone: "555-234-5678",
        createdAt: "2023-01-22T09:10:00Z",
        updatedAt: "2023-04-22T10:50:00Z",
        isOnline: false
    },
    {
        id: "9a0b1c2d-3e4f-5g6h-7i8j-9k0l1m2n3o4p",
        name: "Ethan Walker",
        email: "ethan.walker@example.com",
        phone: "555-345-6789",
        createdAt: "2023-02-18T12:35:00Z",
        updatedAt: "2023-05-05T14:15:00Z",
        isOnline: true
    },
    {
        id: "0b1c2d3e-4f5g-6h7i-8j9k-0l1m2n3o4p5q",
        name: "Abigail Hall",
        email: "abigail.hall@example.com",
        phone: "555-456-7890",
        createdAt: "2023-03-28T15:20:00Z",
        updatedAt: "2023-05-11T16:40:00Z",
        isOnline: false
    },
    {
        id: "1c2d3e4f-5g6h-7i8j-9k0l-1m2n3o4p5q6r",
        name: "Alexander Young",
        email: "alexander.young@example.com",
        phone: "555-567-8901",
        createdAt: "2023-01-26T10:45:00Z",
        updatedAt: "2023-04-26T12:55:00Z",
        isOnline: true
    },
    {
        id: "2d3e4f5g-6h7i-8j9k-0l1m-2n3o4p5q6r7s",
        name: "Ella King",
        email: "ella.king@example.com",
        phone: "555-678-9012",
        createdAt: "2023-02-20T13:30:00Z",
        updatedAt: "2023-05-03T15:45:00Z",
        isOnline: false
    },
    {
        id: "3e4f5g6h-7i8j-9k0l-1m2n-3o4p5q6r7s8t",
        name: "Daniel Wright",
        email: "daniel.wright@example.com",
        phone: "555-789-0123",
        createdAt: "2023-03-30T11:15:00Z",
        updatedAt: "2023-05-09T13:25:00Z",
        isOnline: true
    }
]

