import { GridifyQueryBuilder } from "gridify-client";

type ConditionFn = () => void;

/**
 * Apply conditions to GridifyQueryBuilder with automatic .and() chaining.
 */
export function applyConditions(queryBuilder: GridifyQueryBuilder, conditions: ConditionFn[]) {
  conditions.forEach((conditionFn, index) => {
    if (index > 0) queryBuilder.and();
    conditionFn();
  });
}
