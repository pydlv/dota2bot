export function Unit<T>() {
    abstract class Unit {
        private static instances: Map<hUnit, T> = new Map();

        hUnit: dotaHUnit;

        protected constructor(hUnit: hUnit) {
            this.hUnit = hUnit;
        }

        static getInstance(hUnit: hUnit): T {
            const oldInstance = this.instances.get(hUnit);

            if (oldInstance === undefined) {
                const newInstance = this.createInstance(hUnit);
                this.instances.set(hUnit, newInstance);

                return newInstance;
            }

            return oldInstance;
        }

        static clearInstances() {
            this.instances.clear();
        }

        static createInstance(hUnit: hUnit): T {
            throw("Not implemented!");
        }

        static populate() {
            throw("Not implemented!");
        }

        static all(): T[] {
            return Array.from(this.instances.values());
        }

        static contains(hUnit: hUnit): boolean {
            return this.instances.has(hUnit);
        }

        getAttackTarget(): hUnit | null {
            const posIsVisible = IsLocationVisible(this.hUnit.GetLocation());
            if (posIsVisible) {
                return this.hUnit.GetAttackTarget();
            }
            return null;
        }

        isVisible(): boolean {
            return IsLocationVisible(this.hUnit.GetLocation());
        }

        static getNearby(pos: vector, radius: number = 1600) {
            return this.all().filter(unit => GetUnitToLocationDistance((<Unit>unit).hUnit, pos) <= radius);
        }
    }

    return Unit;
}
