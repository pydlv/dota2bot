// export interface Unit<T> {
//     instances: Map<hUnit, T>;
//
//     hUnit: hUnit,
//     attackTarget: Unit<any>
//
//     getInstance(hUnit: hUnit): T;
// }

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

        // get attackTarget(): Unit {
        //     // Check if attack target is tower
        //     return this.hUnit.GetAttackTarget();
        // }
    }

    return Unit;
}
