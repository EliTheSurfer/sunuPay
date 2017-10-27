import { Injectable } from '@angular/core';

@Injectable()
export class ChatIdProviderService {
    /**
     * 
     * Fonction qui fournit l'identifiant d'une session de chat en concatenant l'id des deux personnes
     * apres les avoir triées par ordre alphabetique 
     * Ex : aaa et bbb donne aaabbb
     * 
     * @param string firstId 
     * @param string secondId 
     */
    provideChatId( firstId : string, secondId : string) : string {
        if( firstId >= secondId) return secondId+firstId;        
        if( firstId < secondId) return firstId+secondId;
    }
}