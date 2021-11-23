const createTagsSubmenu = false; // whether to place all tag groups in the 'Tags' submenu, otherwise place them straight in the main context menu    

(function Tagify(){
    if (!(Spicetify.LocalStorage && Spicetify.ContextMenu && Spicetify.URI && Spicetify.CosmosAsync)) {
        setTimeout(Tagify, 1000);
        return;
    }

    const baseURL = "http://localhost:63848/";
    const tagToItemMap = {}

    function createItem(tag) {
        const item = new Spicetify.ContextMenu.Item(tag, (uris) => toggleTag(tag, uris), (uris) => beforeTag(tag, uris), "plus-alt");
        tagToItemMap[tag] = item;
        return item;
    }

    function createSubmenu(name, children) {
        const subItems = children.map((child) => {
            if (child === Object(child)) {
                const key = Object.keys(child)[0];
                const children2 = child[key];
                if (!children2.length) {
                    return null;
                }
                return createSubmenu(key, children2);
            } else if (typeof child === 'string') {
                return createItem(child)
            }
        })
        .filter(obj => obj);

        if (!subItems.length) {
            return null;
        }
        
        return new Spicetify.ContextMenu.SubMenu(name, subItems);
    }

    function initTags() {
        Spicetify.CosmosAsync.get(baseURL + "taggroups").then(tagGroups => {
            if (createTagsSubmenu) {
                const array = Object.keys(tagGroups)
                    .map(tagGroup => {
                        if (tagGroup !== 'default') {
                            return {[tagGroup]: tagGroups[tagGroup]};
                        }
                    })
                    .filter(item => item);

                if (tagGroups['default'].length) {
                    array.push(...tagGroups['default']);
                }

                tagGroups = {'Tags': array};
            }
            
            Object.keys(tagGroups).map((name) => {
                const children = tagGroups[name];
                return createSubmenu(name, children);
            })
            .filter(obj => obj)
            .forEach(submenu => submenu.register());
        });
    }

    Spicetify.CosmosAsync.get(baseURL + "json/connection/userid").then(userId => {
        if (!userId) {
            Spicetify.CosmosAsync.get(baseURL + "connection/login").then(loginResponse => {
                initTags()
            });
        }
        initTags();
    });

    

    function buildUrl(tag, uris, forceJson) {
        const ids = uris.map(uri => uri.split(":")[2]).map(id => "id=" + id).join("&")
        const type = uris[0].split(":")[1];
        
        let typeSegment;
        switch (type) {
            case Spicetify.URI.Type.TRACK:
                typeSegment = "tracks";
                break;
            case Spicetify.URI.Type.ALBUM:
                typeSegment = "album";
                break;
            case Spicetify.URI.Type.PLAYLIST:
                typeSegment = "playlist";
                break;
        }

        return baseURL + (forceJson ? "json/" : "") + "tags/" + tag + "/" + typeSegment + "?" + ids;
    }

    function toggleTag(tag, uris) {
        Spicetify.CosmosAsync.get(buildUrl(tag, uris, true)).then(tagStatus => {
            const url = buildUrl(tag, uris)
            switch (tagStatus.result) {
                case "NONE":                    
                case "SOME":
                    Spicetify.CosmosAsync.post(url).then(result => {

                    });
                    break;

                case "ALL":
                    Spicetify.CosmosAsync.del(url).then(result => {

                    });
                    break;
            }
        });
    }

    function beforeTag(tag, uris) {
        const url = buildUrl(tag, uris, true);

        Spicetify.CosmosAsync.get(url).then(tagStatus => {
            switch (tagStatus.result) {
                case "NONE":                    
                case "SOME":
                    tagToItemMap[tag].icon = "plus-alt"
                    break;

                case "ALL":
                    tagToItemMap[tag].icon = "block"
                    break;
            }
        });

        return true;
    }
})();