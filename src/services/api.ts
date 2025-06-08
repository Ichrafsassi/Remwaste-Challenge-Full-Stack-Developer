/**
 * API service for handling skip data fetching
 */
import { Skip } from '../types';

export class SkipApiService {
  private static readonly BASE_URL = 'https://app.wewantwaste.co.uk/api';
  
  /**
   * Fetch skips by location
   */
  static async fetchSkipsByLocation(postcode: string, area: string): Promise<Skip[]> {
    try {
      const url = `${this.BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return this.transformSkipData(data);
    } catch (error) {
      console.error('Error fetching skips:', error);
      throw error;
    }
  }
  
  /**
   * Transform raw API data to Skip interface
   */
  private static transformSkipData(data: any[]): Skip[] {
    return data.map((item: any, index: number) => ({
      id: item.id || index + 1,
      size: item.size || `${item.yards || (index + 1) * 2} Yards`,
      hire_period: item.hire_period || '14 day hire period',
      price_before_vat: Number(item.price_before_vat) || 150 + (index * 30),
      vat: Number(item.vat) || Math.round((Number(item.price_before_vat) || 150 + (index * 30)) * 0.2),
      allowed_on_road: Boolean(item.allowed_on_road),
      allows_heavy_waste: Boolean(item.allows_heavy_waste),
    }));
  }
  
  /**
   * Get fallback skip data for demo/offline use
   */
  static getFallbackSkips(): Skip[] {
    return [
      {
        id: 1,
        size: '4 Yards',
        hire_period: '14 day hire period',
        price_before_vat: 176,
        vat: 35,
        allowed_on_road: true,
        allows_heavy_waste: false,
      },
      {
        id: 2,
        size: '5 Yards',
        hire_period: '14 day hire period',
        price_before_vat: 201,
        vat: 40,
        allowed_on_road: true,
        allows_heavy_waste: true,
      },
      {
        id: 3,
        size: '6 Yards',
        hire_period: '14 day hire period',
        price_before_vat: 220,
        vat: 44,
        allowed_on_road: false,
        allows_heavy_waste: true,
      },
      {
        id: 4,
        size: '8 Yards',
        hire_period: '14 day hire period',
        price_before_vat: 260,
        vat: 52,
        allowed_on_road: false,
        allows_heavy_waste: true,
      },
      {
        id: 5,
        size: '10 Yards',
        hire_period: '14 day hire period',
        price_before_vat: 300,
        vat: 60,
        allowed_on_road: false,
        allows_heavy_waste: true,
      },
      {
        id: 6,
        size: '12 Yards',
        hire_period: '14 day hire period',
        price_before_vat: 340,
        vat: 68,
        allowed_on_road: false,
        allows_heavy_waste: true,
      },
    ];
  }
}