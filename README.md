# explanesWeb
Explanes presentation website

C'est de l'angular relativement bateau, juste 2 choses a noter :

1. pour simplifier la gestion, le contenu est reparti dans des fichiers fragments HTML dnas le repertoire "pages" ; ceux-ci sont inclus dans la page par la directive "ng-include". Pour que cela fonctionne, il faut acceder le site par http -- cela ne marchera pas en acces local "file". Donc il faut soit avoir un serveur local, soit avoir une version en ligne.

2. Pour que ce soit un peu dynamique, j'ai fait des transitions entre tabs par "slides", ce qui rend le code un peu plus tordu que du simple "affiche / cache ce panneau".

Pour la partie slideshow / profil en haut, je ne savais pas ce que tu voulais mettre, donc ce'st juste un placeholder.

Style, couleurs, etc., sont bien sur a revoir.

toto
