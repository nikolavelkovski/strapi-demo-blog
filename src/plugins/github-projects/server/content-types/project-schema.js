module.exports = {
    kind: 'collectionType',
    collectionName: 'projects',
    info: {
        singularName: 'project', // kebab-case mandatory
        pluralName: 'projects', // kebab-case mandatory
        displayName: 'Project',
    },
    options: {
        draftAndPublish: true,
    },
    pluginOptions: {
        // 'content-manager': {
        //     visible: false,
        // },
        // 'content-type-builder': {
        //     visible: false,
        // }
    },
    attributes: {
        repositoryId: {
            type: "uid",
            unique: true
        },
        title: {
            type: 'string',
            required: true,
            unique: true,
        },
        shortDescription: {
            type: "string"
        },
        repositoryUrl: {
            type: "string"
        },
        longDescription: {
            type: "richtext"
        },
        coverImage: {
            type: "media",
            allowedTypes: ["images"],
            multiple: false
        }
    }
}