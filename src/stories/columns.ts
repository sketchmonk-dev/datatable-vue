import type { DataTableColumnDef } from "../../lib";
import type { User } from "./data";

export interface ColumnMeta {
    display?: {
        type: 'email' | 'phone' | 'text' | 'timestamp' | 'status';
    },
    filter?: {
        type: 'text' | 'number' | 'category';
        options?: string[]; // for category filters
    }
}

export const columns: DataTableColumnDef<User, ColumnMeta>[] = [
    {
        key: 'name',
        title: 'Name',
        accessor: (row) => row.name,
        sortable: true,
        filterable: false,
        meta: {
            display: {
                type: 'text'
            },
        }
    },
    {
        key: 'email',
        title: 'Email',
        accessor: (row) => row.email,
        sortable: false,
        filterable: false,
        meta: {
            display: {
                type: 'email'
            }
        }
    },
    {
        key: 'phone',
        title: 'Phone Number',
        accessor: (row) => row.phone,
        sortable: false,
        filterable: false,
        meta: {
            display: {
                type: 'phone'
            }
        }
    },
    {
        key: 'createdAt',
        title: 'Created At',
        accessor: (row) => row.createdAt,
        sortable: true,
        filterable: false,
        meta: {
            display: {
                type: 'timestamp'
            }
        }
    },
    {
        key: 'updatedAt',
        title: 'Updated At',
        accessor: (row) => row.updatedAt,
        sortable: true,
        filterable: false,
        meta: {
            display: {
                type: 'timestamp'
            }
        }
    },
    {
        key: 'isOnline',
        title: 'Status',
        accessor: (row) => row.isOnline,
        sortable: false,
        filterable: true,
        meta: {
            display: {
                type: 'status'
            },
            filter: {
                type: 'category',
                options: ['online', 'offline']
            }
        }
    },
]