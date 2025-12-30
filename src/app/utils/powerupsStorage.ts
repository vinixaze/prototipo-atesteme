// Sistema de armazenamento de power-ups e digcoins

export interface PowerUp {
  id: number;
  name: string;
  quantity: number;
  type: 'retry' | 'reset-time' | 'shield' | 'unlock-theory' | 'check-answer';
}

export interface UserInventory {
  digcoins: number;
  powerups: PowerUp[];
}

const STORAGE_KEY = 'atesteme_user_inventory';

// Inventário padrão inicial com power-ups de demonstração
const defaultInventory: UserInventory = {
  digcoins: 543,
  powerups: [
    { id: 1, name: 'Segunda Chance', quantity: 1, type: 'retry' },
    { id: 3, name: 'Escudo (50/50)', quantity: 2, type: 'shield' },
    { id: 4, name: 'Desbloqueio Teoria', quantity: 5, type: 'unlock-theory' },
    { id: 8, name: 'Conferir Resposta', quantity: 3, type: 'check-answer' }
  ]
};

// Obter inventário do usuário
export function getUserInventory(): UserInventory {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const inventory = JSON.parse(stored);
      
      // Migração automática: adicionar novos power-ups padrão se não existirem
      const defaultPowerUps = defaultInventory.powerups;
      let updated = false;
      
      defaultPowerUps.forEach(defaultPowerUp => {
        const exists = inventory.powerups.some((p: PowerUp) => p.id === defaultPowerUp.id);
        if (!exists) {
          inventory.powerups.push({ ...defaultPowerUp });
          updated = true;
        }
      });
      
      // Salvar se houve atualização
      if (updated) {
        saveUserInventory(inventory);
        console.log('✅ Inventário atualizado com novos power-ups!');
      }
      
      return inventory;
    }
    // Se não há inventário salvo, retornar o padrão
    const newInventory = { ...defaultInventory, powerups: [...defaultInventory.powerups] };
    saveUserInventory(newInventory);
    return newInventory;
  } catch (error) {
    console.error('Erro ao carregar inventário:', error);
    return { ...defaultInventory };
  }
}

// Salvar inventário do usuário
export function saveUserInventory(inventory: UserInventory): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
  } catch (error) {
    console.error('Erro ao salvar inventário:', error);
  }
}

// Adicionar digcoins
export function addDigcoins(amount: number): void {
  const inventory = getUserInventory();
  inventory.digcoins += amount;
  saveUserInventory(inventory);
}

// Remover digcoins
export function removeDigcoins(amount: number): boolean {
  const inventory = getUserInventory();
  if (inventory.digcoins >= amount) {
    inventory.digcoins -= amount;
    saveUserInventory(inventory);
    return true;
  }
  return false;
}

// Comprar power-up
export function buyPowerUp(
  powerupId: number,
  powerupName: string,
  cost: number,
  type: PowerUp['type']
): boolean {
  const inventory = getUserInventory();
  
  // Verificar se tem digcoins suficientes
  if (inventory.digcoins < cost) {
    return false;
  }
  
  // Remover digcoins
  inventory.digcoins -= cost;
  
  // Adicionar power-up ao inventário
  const existingPowerup = inventory.powerups.find(p => p.id === powerupId);
  if (existingPowerup) {
    existingPowerup.quantity += 1;
  } else {
    inventory.powerups.push({
      id: powerupId,
      name: powerupName,
      quantity: 1,
      type
    });
  }
  
  saveUserInventory(inventory);
  return true;
}

// Usar power-up
export function usePowerUp(powerupId: number): boolean {
  const inventory = getUserInventory();
  const powerup = inventory.powerups.find(p => p.id === powerupId);
  
  if (!powerup || powerup.quantity <= 0) {
    return false;
  }
  
  powerup.quantity -= 1;
  
  // Remover do inventário se quantidade for 0
  if (powerup.quantity === 0) {
    inventory.powerups = inventory.powerups.filter(p => p.id !== powerupId);
  }
  
  saveUserInventory(inventory);
  return true;
}

// Obter quantidade de um power-up específico
export function getPowerUpQuantity(powerupId: number): number {
  const inventory = getUserInventory();
  const powerup = inventory.powerups.find(p => p.id === powerupId);
  return powerup ? powerup.quantity : 0;
}

// Obter saldo de digcoins
export function getDigcoinsBalance(): number {
  const inventory = getUserInventory();
  return inventory.digcoins;
}

// Resetar inventário (para testes)
export function resetInventory(): void {
  localStorage.removeItem(STORAGE_KEY);
}