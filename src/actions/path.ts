interface PathSegment {
    start: vector;
    end: vector;
}

export class Path {
    protected segments: PathSegment[] = [];

    addSegment(start: vector, end: vector) {
        this.segments.push({
            start: start,
            end: end
        });
    }

    walk() {
        return this.segments.map(x => x);
    }

    first() {
        return this.segments[0];
    }
}
