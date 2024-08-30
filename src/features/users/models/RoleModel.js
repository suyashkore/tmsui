// tmsui/src/features/users/models/RoleModel.js

/**
 * Role Model
 * Represents the structure of a role object in the application.
 */
export class Role {
    constructor({
        id = null,
        tenant_id = null,
        name = '',
        description = '',
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null,
        privileges = []
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.name = name;
        this.description = description;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.privileges = privileges.map(privilege => new Privilege(privilege)); // Convert privileges to Privilege instances
    }

    static fromApiResponse(response) {
        return new Role({
            id: response.id,
            tenant_id: response.tenant_id,
            name: response.name,
            description: response.description,
            created_by: response.created_by,
            updated_by: response.updated_by,
            created_at: response.created_at,
            updated_at: response.updated_at,
            privileges: response.privileges || []
        });
    }

    toApiPayload() {
        return {
            tenant_id: this.tenant_id,
            name: this.name,
            description: this.description,
            privileges: this.privileges.map(privilege => privilege.id)
        };
    }
}

/**
 * Privilege Model
 * Represents the structure of a privilege object in the role.
 */
export class Privilege {
    constructor({
        id = null,
        name = ''
    } = {}) {
        this.id = id;
        this.name = name;
    }

    static fromApiResponse(response) {
        return new Privilege({
            id: response.id,
            name: response.name
        });
    }
}
