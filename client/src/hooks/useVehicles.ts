// React hooks around the Supabase data-access layer.
//
// Each hook returns an async state: { data, loading, error }. When the
// Supabase GraphQL endpoint is not configured (e.g. local dev before the
// project is provisioned), the data layer throws a typed NoEndpointError which
// the UI renders as a deliberate "not configured" state — never a crash and
// never a hard-coded fallback catalogue.
import { useEffect, useState } from "react";
import {
  getFeaturedVehicles,
  getVehicleById,
  getVehicles,
  getVehicleMakes,
} from "@/data/vehicles/vehicle.api";
import {
  type Vehicle,
  type VehicleFilters,
} from "@/data/vehicles/vehicle.types";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(run: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    run()
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(error => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

export function useFeaturedVehicles(limit = 4): AsyncState<Vehicle[]> {
  return useAsync(() => getFeaturedVehicles(limit), [limit]);
}

export function useVehicles(
  filters: VehicleFilters = {}
): AsyncState<Vehicle[]> & { total: number } {
  const [state, setState] = useState<AsyncState<Vehicle[]>>({
    data: null,
    loading: true,
    error: null,
  });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    setTotal(0);
    getVehicles(filters)
      .then(result => {
        if (!cancelled) {
          setState({ data: result.vehicles, loading: false, error: null });
          setTotal(result.total);
        }
      })
      .catch(error => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);
  return { ...state, total };
}

export function useVehicle(id: string | undefined): AsyncState<Vehicle | null> {
  return useAsync(() => getVehicleById(id ?? ""), [id]);
}

export function useVehicleMakes(): AsyncState<string[]> {
  return useAsync(() => getVehicleMakes(), []);
}
