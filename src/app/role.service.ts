// role.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  getRole(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
  }

  setRole(role: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
    }
  }
}
