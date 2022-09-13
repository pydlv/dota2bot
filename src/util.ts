export function euclideanDistance(vec1: vector, vec2: vector) {
    return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) +
        Math.pow(vec1.y - vec2.y, 2) +
        Math.pow(vec1.z - vec2.z, 2));
}
