import { fetchJson, includes } from "./util.js";

export class Pokedex {
    constructor(apiUrl, pageSize = 25) {
        if (!apiUrl.length) {
            throw new Error("ApiURL must be filled!");
        }

        this.nextPageUrl = `${apiUrl}?limit=${pageSize}&offset=0`;
        this.currentPageUrl = null;
        this.prevPageUrl = null;
        this.cache = {};
    }

    getNextPage() {
        if (!this.nextPageUrl) {
            console.warn("You're on the last page already.", this.nextPageUrl)
            return [];
        }
        return this.fetchPage(this.nextPageUrl);
    }

    getPrevPage() {
        if (!this.prevPageUrl) {
            console.warn("You're on the first page already.")
            return [];
        }
        return this.fetchPage(this.prevPageUrl);
    }

    getCurrentPage() {
        if (!this.currentPageUrl) {
            console.warn("You haven't loaded any pages yet [hint: try calling `getNextPage` first].")
            return [];
        }
        return this.fetchPage(this.currentPageUrl);
    }

    getAllLoadedPokemons() {
        return Object.values(this.cache).flat(1);
    }

    findPokemonsByName(keyword) {
        const allPokemons = this.getAllLoadedPokemons();
        if (!keyword.length) {
            return allPokemons;
        }

        return allPokemons.filter(it => includes(it.name, keyword))
    }

    async fetchPage(url) {
        if (url in this.cache) {
            return this.cache[url]
        }

        const { results, next, previous } = await fetchJson(url);
        const pageWithDetails = await Promise.all(results.map(it => fetchJson(it.url)));

        this.currentPageUrl = url;
        this.nextPageUrl = next;
        this.prevPageUrl = previous;
        this.cache[url] = pageWithDetails;
        return pageWithDetails;
    }
}
