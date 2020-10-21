class Percolation {

    constructor(n) {
        this.dimension = n;
        this.id = Array.from(Array(n*n+2).keys());
        this.size = this.id.map(() => 1);
        this.sitesState = this.id.map(() => 0);
        this.closedSites = [...this.id];
        this.openSites = 0;

        for (let i = 0; i < n; i++) {
            this.union(i +1 , 0);
            this.union(this.id.length - (2+i), this.id.length - 1);
        }
    }
    percolates() {
        return this.connected(0, this.id.length -1)
    }
    simulate() {
        
        while(!this.percolates()) {
            let ind = Math.floor(Math.random() * (this.closedSites.length - 2) +1);
            let site = this.closedSites.splice(ind, 1)[0];
            this.openSite(site);
            this.openSites ++;
        }
        return this.openSites / this.dimension**2;
    }
    openSite(site) {

        this.sitesState[site] = 1;
        let up = site - this.dimension;
        let down = site + this.dimension;
        let left = site - 1;
        let right = site +1;
        
        if(up > 0 && this.sitesState[up]) {
            this.union(site, up );
        }
        if(down < this.id.length - 1 && this.sitesState[down]) {
            this.union(site, down );
        }
        if(Math.ceil( left / this.dimension) === Math.ceil(site / this.dimension) && this.sitesState[left]) {
            this.union(site, left );
        }
        if(Math.ceil(right / this.dimension ) === Math.ceil(site / this.dimension) && this.sitesState[right]) {
            this.union(site, right );
        }
    }
    root(p) {

        while(p != this.id[p]) {
            p = this.id[p];
            this.id[p] = this.id[this.id[p]];
        }
        return p
    }
    connected(p, q) {
        return this.root(p) === this.root(q);
    }
    union(p, q) {
        if(this.size[p] > this.size[q]) {
            this.id[this.root(q)] = this.root(p);
            this.size[p] += this.size[q];
        }else {
            this.id[this.root(p)] = this.root(q);
            this.size[q] += this.size[p];
        } 
        return true;
    }
}