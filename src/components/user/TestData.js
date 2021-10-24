function getId(letra) {
    if(letra=='N'){
        return 1
    }
    if(letra=='G'){
        return 2
    }
    if(letra=='A'){
        return 3
    }
    if(letra=='L'){
        return 4
    }
    if(letra=='P'){
        return 5
    }
    if(letra=='I'){
        return 6
    }
    if(letra=='T'){
        return 7
    }
    if(letra=='V'){
        return 8
    }
    if(letra=='X'){
        return 9
    }
    if(letra=='S'){
        return 10
    }
    if(letra=='B'){
        return 11
    }
    if(letra=='O'){
        return 12
    }
    if(letra=='R'){
        return 13
    }
    if(letra=='D'){
        return 14
    }
    if(letra=='C'){
        return 15
    }
    if(letra=='Z'){
        return 16
    }
    if(letra=='E'){
        return 17
    }
    if(letra=='K'){
        return 18
    }
    if(letra=='F'){
        return 19
    }
    if(letra=='W'){
        return 20
    }

}
export const TestData =[
    {
        id:1,
        questionText: 'Pregunta 1',
        answerOptions: [
            {answerText:'Soy trabajador',
            answerValue:'G',
            factor_id:getId('G')}, 
            {answerText:'No soy de humor variable',
            answerValue:'Z',
            factor_id:getId('Z')},
            
        ],
    },
    {
        id:2,
        questionText: 'Pregunta 2',
        answerOptions: [
            {answerText:'Me gusta hacer el trabajo mejor que los demás',
            answerValue:'A',
            factor_id:getId('A') },
            {answerText:'Me gusta seguir con lo he empezado hasta terminarlo',
            answerValue:'N',
            factor_id:getId('N')}
        ],
    },
    {
        id:3,
        questionText: 'Pregunta 3',
        answerOptions: [
            {answerText:'Me gusta enseñar a la gente cómo hacer las cosas',
            answerValue:'P',
            factor_id:getId('P') },
            {answerText:'Me gusta hacer las cosas lo mejor posible',
            answerValue:'A',
            factor_id:getId('A') },
        ],
    },
    {
        id:4,
        questionText: 'Pregunta 4',
        answerOptions: [
            {answerText:'Me gusta hacer las cosas lo mejor posible',
            answerValue:'X',
            factor_id:getId('X') }, 
            {answerText:'Me gusta decir a la gente lo que tiene que hacer',
            answerValue:'P',
            factor_id:getId('P') }
        ],
    },
    {
        id:5,
        questionText: 'Pregunta 5',
        answerOptions: [
            {answerText:'Me gusta unirme a grupos',
            answerValue:'B',
            factor_id:getId('B') }, 
            {answerText:'Me gusta ser tomado en cuenta por los grupos',
            answerValue:'X',
            factor_id:getId('X') }
        ],
    },
    {
        id:6,
        questionText: 'Pregunta 6',
        answerOptions: [
            {answerText:'Me gusta hacer un amigo íntimo',
            answerValue:'O',
            factor_id:getId('O') }, 
            {answerText:'Me gusta hacer amistad con el grupo',
            answerValue:'B',
            factor_id:getId('B') }

        ],
    },
    {
        id:7,
        questionText: 'Pregunta 7',
        answerOptions: [
            {answerText:'Soy rápido en cambiar cuando lo creo necesario',
            answerValue:'E',
            factor_id:getId('E')}, 
            {answerText:'Intento hacer amigos íntimos',
            answerValue:'O',
            factor_id:getId('O') }
        ],
    },
    {
        id:8,
        questionText: 'Pregunta 8',
        answerOptions: [
            {answerText:'Me gusta “devolverla” cuando alguien me ofende',
            answerValue:'K',
            factor_id:getId('K') },
            {answerText:'Me gusta hacer cosas nuevas o diferentes',
            answerValue:'E',
            factor_id:getId('E') }
        ],
    },
    {
        id:9,
        questionText: 'Pregunta 9',
        answerOptions: [
            {answerText:'Quiero que mi jefe me estime',
            answerValue:'F',
            factor_id:getId('F') }, 
            {answerText:'Me gusta decir a la gente cuando están equivocados',
            answerValue:'K',
            factor_id:getId('K') }
        ],
    },
    {
        id:10,
        questionText: 'Pregunta 10',
        answerOptions: [
            {answerText:'Me gusta seguir las instrucciones que me dan',
            answerValue:'W',
            factor_id:getId('W') }, 
            {answerText:'Me gusta agradar a mis superiores',
            answerValue:'F',
            factor_id:getId('F') }
        ],
    },
    {
        id:11,
        questionText: 'Pregunta 11',
        answerOptions: [
            {answerText:'Me esfuerzo mucho',
            answerValue:'G',
            factor_id:getId('G') }, 
            {answerText:'Soy ordenado',
            answerValue:'C',
            factor_id:getId('C') }
        ],
    },
    {
        id:12,
        questionText: 'Pregunta 12',
        answerOptions: [
            {answerText:'Consigo que la gente haga lo que yo quiero',
            answerValue:'L',
            factor_id:getId('L') }, 
            {answerText:'No me altero fácilmente',
            answerValue:'Z',
            factor_id:getId('Z') }

        ],
    },
    {
        id:13,
        questionText: 'Pregunta 13',
        answerOptions: [
            {answerText:'Me gusta decir al grupo lo que tiene que hacer',
            answerValue:'P',
            factor_id:getId('P') }, 
            {answerText:'Siempre continúo un trabajo hasta que está hecho',
            answerValue:'N',
            factor_id:getId('N') }
        ],
    },
    {
        id:14,
        questionText: 'Pregunta 14',
        answerOptions: [
            {answerText:'Me gusta ser animado e interesante' ,
            answerValue:'X',
            factor_id:getId('X') },
            {answerText:'Yo quiero tener mucho éxito',
            answerValue:'A',
            factor_id:getId('A') }
        ],
    },
    {
        id:15,
        questionText: 'Pregunta 15',
        answerOptions: [
            {answerText:'Me gusta “encajar” con grupos',
            answerValue:'B',
            factor_id:getId('B') }, 
            {answerText:'Me gusta ayudar a las personas a tomar decisiones',
            answerValue:'P',
            factor_id:getId('P') }
        ],
    },
    {
        id:16,
        questionText: 'Pregunta 16',
        answerOptions: [
            {answerText:'Me preocupa cuando alguien no me estima',
            answerValue:'O',
            factor_id:getId('O') }, 
            {answerText:'Me gusta que la gente note mi presencia',
            answerValue:'X',
            factor_id:getId('X') }
        ],
    },
    {
        id:17,
        questionText: 'Pregunta 17',
        answerOptions: [
            {answerText:'Me gusta probar cosas nuevas',
            answerValue:'E',
            factor_id:getId('E') }, 
            {answerText:'Prefiero trabajar con otras personas que solo',
            answerValue:'B',
            factor_id:getId('B') }
        ],
    },
    {
        id:18,
        questionText: 'Pregunta 18',
        answerOptions: [
            {answerText:'Algunas veces culpo a otros cuando las cosas salen mal ',
            answerValue:'K',
            factor_id:getId('K')  }, 
            {answerText:'Me molesta cuando no le gusto a alguien',
            answerValue:'O',
            factor_id:getId('O')  }

        ],
    },
    {
        id:19,
        questionText: 'Pregunta 19',
        answerOptions: [
            {answerText:'Me gusta complacer a mis superiores',
            answerValue:'F',
            factor_id:getId('F') }, 
            {answerText:'Me gusta intentar trabajos nuevos y diferentes',
            answerValue:'E',
            factor_id:getId('E')  }
        ],
    },
    {
        id:20,
        questionText: 'Pregunta 20',
        answerOptions: [
            {answerText:'Me gusta tener instrucciones detalladas para hacer un trabajo',
            answerValue:'W',
            factor_id:getId('W')   },
            {answerText:'Me gusta decírselo a la gente cuando me enfada',
            answerValue:'K',
            factor_id:getId('K')  }
        ],
    },
    {
        id:21,
        questionText: 'Pregunta 21',
        answerOptions: [
            {answerText:'Siempre me esfuerzo mucho',
            answerValue:'G',
            factor_id:getId('G')  }, 
            {answerText:'Me gusta ir paso a paso con gran cuidado',
            answerValue:'D',
            factor_id:getId('D')  }
        ],
    },
    {
        id:22,
        questionText: 'Pregunta 22',
        answerOptions: [
            {answerText:'Soy un buen “dirigente”',
            answerValue:'L',
            factor_id:getId('L')  }, 
            {answerText:'Organizo bien el trabajo en un puesto',
            answerValue:'C',
            factor_id:getId('C')  }
        ],
    },
    {
        id:23,
        questionText: 'Pregunta 23',
        answerOptions: [
            {answerText:'Me enfado con facilidad',
            answerValue:'I',
            factor_id:getId('I')  }, 
            {answerText:'Soy lento tomando decisiones',
            answerValue:'Z',
            factor_id:getId('Z')  }
        ],
    },
    {
        id:24,
        questionText: 'Pregunta 24',
        answerOptions: [
            {answerText:'Me gusta trabajar en varias actividades al mismo tiempo ',
            answerValue:'X',
            factor_id:getId('X')  }, 
            {answerText:'Cuando estoy en grupo me gusta estar callado',
            answerValue:'N',
            factor_id:getId('N')  }

        ],
    },
    {
        id:25,
        questionText: 'Pregunta 25',
        answerOptions: [
            {answerText:'Me encanta que me inviten',
            answerValue:'B',
            factor_id:getId('B')  }, 
            {answerText:'Me gusta hacer las cosas mejor que los demás',
            answerValue:'A',
            factor_id:getId('A') }
        ],
    },
    {
        id:26,
        questionText: 'Pregunta 26',
        answerOptions: [
            {answerText:'Me gusta hacer amigos íntimos' ,
            answerValue:'O',
            factor_id:getId('O')  },
            {answerText:'Me gusta hablar de mis éxitos',
            answerValue:'P',
            factor_id:getId('P')  }
        ],
    },
    {
        id:27,
        questionText: 'Pregunta 27',
        answerOptions: [
            {answerText:'Me  gusta hacer cosas nuevas y diferentes',
            answerValue:'E',
            factor_id:getId('E')  }, 
            {answerText:'Me gusta hablar de mis éxitos',
            answerValue:'X',
            factor_id:getId('X')  }
        ],
    },
    {
        id:28,
        questionText: 'Pregunta 28',
        answerOptions: [
            {answerText:'Cuando tengo razón me gusta luchar por ella',
            answerValue:'K',
            factor_id:getId('K')  }, 
            {answerText:'Me gusta pertenecer a un grupo',
            answerValue:'B',
            factor_id:getId('B') }
        ],
    },
    {
        id:29,
        questionText: 'Pregunta 29',
        answerOptions: [
            {answerText:'Evito ser diferente',
            answerValue:'F',
            factor_id:getId('F')  }, 
            {answerText:'Intento acercarme mucho a la gente',
            answerValue:'O',
            factor_id:getId('O')  }
        ],
    },
    {
        id:30,
        questionText: 'Pregunta 30',
        answerOptions: [
            {answerText:'Me gusta que me digan exactamente cómo hacer las cosas',
            answerValue:'W',
            factor_id:getId('W')  }, 
            {answerText:'Me aburro fácilmente',
            answerValue:'E',
            factor_id:getId('E')  }

        ],
    },
    {
        id:31,
        questionText: 'Pregunta 31',
        answerOptions: [
            {answerText:'Trabajo mucho',
            answerValue:'G',
            factor_id:getId('G')  }, 
            {answerText:'Pienso y planeo mucho',
            answerValue:'R',
            factor_id:getId('R')  }
        ],
    },
    {
        id:32,
        questionText: 'Pregunta 32',
        answerOptions: [
            {answerText:'Me gusta dirigir el grupo' ,
            answerValue:'L',
            factor_id:getId('L')  },
            {answerText:'Los pequeños detalles me interesan',
            answerValue:'D',
            factor_id:getId('D')  }
        ],
    },
    {
        id:33,
        questionText: 'Pregunta 33',
        answerOptions: [
            {answerText:'Tomo decisiones fácil y rápidamente',
            answerValue:'I',
            factor_id:getId('I')  }, 
            {answerText:'Tengo mis cosas cuidadas y ordenadas',
            answerValue:'C',
            factor_id:getId('C')  }
        ],
    },
    {
        id:34,
        questionText: 'Pregunta 34',
        answerOptions: [
            {answerText:'Hago las cosas de prisa',
            answerValue:'T',
            factor_id:getId('T')  }, 
            {answerText:'Yo no me pongo enfadado ni triste a menudo',
            answerValue:'Z',
            factor_id:getId('Z')  }
        ],
    },
    {
        id:35,
        questionText: 'Pregunta 35',
        answerOptions: [
            {answerText:'Quiero ser parte del grupo',
            answerValue:'B',
            factor_id:getId('B')  }, 
            {answerText:'Quiero hacer un solo trabajo a un tiempo',
            answerValue:'N',
            factor_id:getId('N')  }
        ],
    },
    {
        id:36,
        questionText: 'Pregunta 36',
        answerOptions: [
            {answerText:'Intento hacer amigos íntimos',
            answerValue:'O',
            factor_id:getId('O')  }, 
            {answerText:'Intento mucho ser el mejor',
            answerValue:'A',
            factor_id:getId('A')  }

        ],
    },
    {
        id:37,
        questionText: 'Pregunta 37',
        answerOptions: [
            {answerText:'Me gustan los nuevos estilos en trajes y coches',
            answerValue:'E',
            factor_id:getId('E')  }, 
            {answerText:'Me gusta ser responsable por otros',
            answerValue:'P',
            factor_id:getId('P')  }
        ],
    },
    {
        id:38,
        questionText: 'Pregunta 38',
        answerOptions: [
            {answerText:'Disfruto discutiendo' ,
            answerValue:'K',
            factor_id:getId('K')  },
            {answerText:'Me gusta llamar la atención',
            answerValue:'X',
            factor_id:getId('X')  }
        ],
    },
    {
        id:39,
        questionText: 'Pregunta 39',
        answerOptions: [
            {answerText:'Me gusta agradar  a  mis  superiores',
            answerValue:'F',
            factor_id:getId('F')  }, 
            {answerText:'Estoy interesado en ser parte del grupo',
            answerValue:'B',
            factor_id:getId('B')  }
        ],
    },
    {
        id:40,
        questionText: 'Pregunta 40',
        answerOptions: [
            {answerText:'Me gusta seguir las reglas con cuidado',
            answerValue:'W',
            factor_id:getId('W')  }, 
            {answerText:'Me gusta que la gente me conozca muy bien',
            answerValue:'O',
            factor_id:getId('O')  }
        ],
    },
    {
        id:41,
        questionText: 'Pregunta 41',
        answerOptions: [
            {answerText:'Me esfuerzo mucho',
            answerValue:'G',
            factor_id:getId('G')  }, 
            {answerText:'Soy muy amigable',
            answerValue:'S',
            factor_id:getId('S')  }
        ],
    },
    {
        id:42,
        questionText: 'Pregunta 42',
        answerOptions: [
            {answerText:'La gente piensa que soy un buen “dirigente” ',
            answerValue:'L',
            factor_id:getId('L')  }, 
            {answerText:'Pienso con cuidado y largamente',
            answerValue:'R',
            factor_id:getId('R')  }

        ],
    },
    {
        id:43,
        questionText: 'Pregunta 43',
        answerOptions: [
            {answerText:'A menudo me arriesgo',
            answerValue:'I',
            factor_id:getId('I')  }, 
            {answerText:'Me gusta protestar por pequeñas cosas',
            answerValue:'D',
            factor_id:getId('D')  }
        ],
    },
    {
        id:44,
        questionText: 'Pregunta 44',
        answerOptions: [
            {answerText:'La gente piensa que trabajo de prisa' ,
            answerValue:'T',
            factor_id:getId('T')  },
            {answerText:'La gente piensa que tengo mis cosas cuidadas y ordenadas',
            answerValue:'C',
            factor_id:getId('C')  }
        ],
    },
    {
        id:45,
        questionText: 'Pregunta 45',
        answerOptions: [
            {answerText:'Me gusta jugar y hacer deportes',
            answerValue:'V',
            factor_id:getId('V')  }, 
            {answerText:'Soy muy agradable',
            answerValue:'Z',
            factor_id:getId('Z')  }
        ],
    },
    {
        id:46,
        questionText: 'Pregunta 46',
        answerOptions: [
            {answerText:'Me gusta que la gente esté unida y sea amistosa',
            answerValue:'O',
            factor_id:getId('O')  }, 
            {answerText:'Siempre trato de terminar lo que he empezado',
            answerValue:'N',
            factor_id:getId('N')  }
        ],
    },
    {
        id:47,
        questionText: 'Pregunta 47',
        answerOptions: [
            {answerText:'Me gusta experimentar y probar nuevas cosas',
            answerValue:'E',
            factor_id:getId('E')  }, 
            {answerText:'Me gusta hacer bien un trabajo difícil',
            answerValue:'A',
            factor_id:getId('A')  }
        ],
    },
    {
        id:48,
        questionText: 'Pregunta 48',
        answerOptions: [
            {answerText:'Me gusta que me traten justamente',
            answerValue:'K',
            factor_id:getId('K')  }, 
            {answerText:'Me gusta decir a los demás cómo hacer las cosas',
            answerValue:'P',
            factor_id:getId('P')  }

        ],
    },
    {
        id:49,
        questionText: 'Pregunta 49',
        answerOptions: [
            {answerText:'Me gusta hacer aquello que esperan de mí',
            answerValue:'F',
            factor_id:getId('F')  }, 
            {answerText:'Me gusta llamar la atención',
            answerValue:'X',
            factor_id:getId('X')  }
        ],
    },
    {
        id:50,
        questionText: 'Pregunta 50',
        answerOptions: [
            {answerText:'Me gusta tener instrucciones precisas para hacer un trabajo',
            answerValue:'W',
            factor_id:getId('W')   },
            {answerText:'Me gusta estar con la gente',
            answerValue:'B',
            factor_id:getId('B')  }
        ],
    },
    {
        id:51,
        questionText: 'Pregunta 51',
        answerOptions: [
            {answerText:'Siempre trato de hacer mi trabajo  perfecto',
            answerValue:'G',
            factor_id:getId('G')  }, 
            {answerText:'Me dicen que soy prácticamente incansable',
            answerValue:'V',
            factor_id:getId('V')  }
        ],
    },
    {
        id:52,
        questionText: 'Pregunta 52',
        answerOptions: [
            {answerText:'Soy el tipo “dirigente”',
            answerValue:'L',
            factor_id:getId('L')  }, 
            {answerText:'Hago amigos fácilmente',
            answerValue:'S',
            factor_id:getId('S')  }
        ],
    },
    {
        id:53,
        questionText: 'Pregunta 53',
        answerOptions: [
            {answerText:'Asumo riesgos',
            answerValue:'I',
            factor_id:getId('I')  }, 
            {answerText:'Pienso mucho',
            answerValue:'R',
            factor_id:getId('R')  }
        ],
    },
    {
        id:54,
        questionText: 'Pregunta 54',
        answerOptions: [
            {answerText:'Trabajo a un paso rápido y constante',
            answerValue:'T',
            factor_id:getId('T')  }, 
            {answerText:'Disfruto trabajando en detalles',
            answerValue:'D',
            factor_id:getId('D')  }

        ],
    },
    {
        id:55,
        questionText: 'Pregunta 55',
        answerOptions: [
            {answerText:'Tengo mucha energía para juegos y deportes',
            answerValue:'V',
            factor_id:getId('V')  }, 
            {answerText:'Tengo mis cosas cuidadas y ordenadas',
            answerValue:'C',
            factor_id:getId('C')  }
        ],
    },
    {
        id:56,
        questionText: 'Pregunta 56',
        answerOptions: [
            {answerText:'Me llevo bien con todo el mundo' ,
            answerValue:'S',
            factor_id:getId('S')  },
            {answerText:'Soy de temperamento estable',
            answerValue:'Z',
            factor_id:getId('Z')  }
        ],
    },
    {
        id:57,
        questionText: 'Pregunta 57',
        answerOptions: [
            {answerText:'Quiero conocer nueva gente y hacer cosas nuevas',
            answerValue:'E',
            factor_id:getId('E')  }, 
            {answerText:'Siempre quiero terminar el trabajo que he empezado',
            answerValue:'N',
            factor_id:getId('N')  }
        ],
    },
    {
        id:58,
        questionText: 'Pregunta 58',
        answerOptions: [
            {answerText:'Normalmente lucho por lo que yo creo',
            answerValue:'K',
            factor_id:getId('K')  }, 
            {answerText:'Normalmente me gusta trabajar mucho',
            answerValue:'A',
            factor_id:getId('A')  }
        ],
    },
    {
        id:59,
        questionText: 'Pregunta 59',
        answerOptions: [
            {answerText:'Me gustan las sugerencias de las personas que admiro',
            answerValue:'F',
            factor_id:getId('F')  }, 
            {answerText:'Me gusta estar encargado de otras personas',
            answerValue:'P',
            factor_id:getId('P')  }
        ],
    },
    {
        id:60,
        questionText: 'Pregunta 60',
        answerOptions: [
            {answerText:'Me dejo influenciar mucho por la gente',
            answerValue:'W',
            factor_id:getId('W')  }, 
            {answerText:'Me gusta ser el centro de atención',
            answerValue:'X',
            factor_id:getId('X')  }

        ],
    },
    {
        id:61,
        questionText: 'Pregunta 61',
        answerOptions: [
            {answerText:'Normalmente trabajo mucho',
            answerValue:'G',
            factor_id:getId('G')  }, 
            {answerText:'Normalmente trabajo de prisa',
            answerValue:'T',
            factor_id:getId('T')  }
        ],
    },
    {
        id:62,
        questionText: 'Pregunta 62',
        answerOptions: [
            {answerText:'Cuando hablo el grupo escucha' ,
            answerValue:'L',
            factor_id:getId('L')  },
            {answerText:'Soy hábil con herramientas',
            answerValue:'V',
            factor_id:getId('V')  }
        ],
    },
    {
        id:63,
        questionText: 'Pregunta 63',
        answerOptions: [
            {answerText:'Soy lento en hacer amigos',
            answerValue:'I',
            factor_id:getId('I')  }, 
            {answerText:'Soy lento en decidirme',
            answerValue:'S',
            factor_id:getId('S')  }
        ],
    },
    {
        id:64,
        questionText: 'Pregunta 64',
        answerOptions: [
            {answerText:'Normalmente como de prisa',
            answerValue:'T',
            factor_id:getId('T')  }, 
            {answerText:'Disfruto leyendo',
            answerValue:'R',
            factor_id:getId('R')  }
        ],
    },
    {
        id:65,
        questionText: 'Pregunta 65',
        answerOptions: [
            {answerText:'Me gusta el trabajo en donde puedo moverme',
            answerValue:'V',
            factor_id:getId('V')  }, 
            {answerText:'Me gusta el trabajo que tenga que hacerse con cuidado',
            answerValue:'D',
            factor_id:getId('D')  }
        ],
    },
    {
        id:66,
        questionText: 'Pregunta 66',
        answerOptions: [
            {answerText:'Hago el mayor número posible de amigos',
            answerValue:'S',
            factor_id:getId('S')  }, 
            {answerText:'Encuentro lo que he guardado',
            answerValue:'C',
            factor_id:getId('C')  }

        ],
    },
    {
        id:67,
        questionText: 'Pregunta 67',
        answerOptions: [
            {answerText:'Planeo a largo plazo',
            answerValue:'R',
            factor_id:getId('R')  }, 
            {answerText:'Siempre soy agradable',
            answerValue:'Z',
            factor_id:getId('Z')  }
        ],
    },
    {
        id:68,
        questionText: 'Pregunta 68',
        answerOptions: [
            {answerText:'Tengo gran orgullo de mi buen nombre',
            answerValue:'K',
            factor_id:getId('K')   },
            {answerText:'Insisto en un problema hasta que está resuelto',
            answerValue:'N',
            factor_id:getId('N')  }
        ],
    },
    {
        id:69,
        questionText: 'Pregunta 69',
        answerOptions: [
            {answerText:'Me gusta agradar ala gente que admiro',
            answerValue:'F',
            factor_id:getId('F')  }, 
            {answerText:'Quiero tener éxito',
            answerValue:'A',
            factor_id:getId('A')  }
        ],
    },
    {
        id:70,
        questionText: 'Pregunta 70',
        answerOptions: [
            {answerText:'Me gusta que otros tomen decisiones  para el grupo',
            answerValue:'W',
            factor_id:getId('W')  }, 
            {answerText:'A mi me gusta tomar decisiones para el grupo',
            answerValue:'P',
            factor_id:getId('P')  }
        ],
    },
    {
        id:71,
        questionText: 'Pregunta 71',
        answerOptions: [
            {answerText:'Siempre me esfuerzo mucho',
            answerValue:'G',
            factor_id:getId('G')  }, 
            {answerText:'Tomo decisiones fácilmente y rápidamente',
            answerValue:'I',
            factor_id:getId('I')  }
        ],
    },
    {
        id:72,
        questionText: 'Pregunta 72',
        answerOptions: [
            {answerText:'El grupo hace normalmente lo que yo quiero ',
            answerValue:'L',
            factor_id:getId('L')  }, 
            {answerText:'Normalmente tengo prisa',
            answerValue:'T',
            factor_id:getId('T')  }
        ],
    },
    {
        id:73,
        questionText: 'Pregunta 73',
        answerOptions: [
            {answerText:'A menudo me siento cansando',
            answerValue:'I',
            factor_id:getId('I')  }, 
            {answerText:'Soy lento tomando decisiones',
            answerValue:'V',
            factor_id:getId('V')  }

        ],
    },
    {
        id:74,
        questionText: 'Pregunta 74',
        answerOptions: [
            {answerText:'Trabajo de prisa',
            answerValue:'T',
            factor_id:getId('T')  }, 
            {answerText:'Hago amigos enseguida',
            answerValue:'S',
            factor_id:getId('S')  }
        ],
    },
    {
        id:75,
        questionText: 'Pregunta 75',
        answerOptions: [
            {answerText:'Normalmente tengo energía',
            answerValue:'V',
            factor_id:getId('V')   },
            {answerText:'Dedico mucho tiempo a pensar',
            answerValue:'R',
            factor_id:getId('R')  }
        ],
    },
    {
        id:76,
        questionText: 'Pregunta 76',
        answerOptions: [
            {answerText:'Soy muy cordial con la gente',
            answerValue:'S',
            factor_id:getId('S')  }, 
            {answerText:'Me gusta el trabajo que requiere precisión',
            answerValue:'D',
            factor_id:getId('D')  }
        ],
    },
    {
        id:77,
        questionText: 'Pregunta 77',
        answerOptions: [
            {answerText:'Pienso y planeo mucho',
            answerValue:'R',
            factor_id:getId('R')  }, 
            {answerText:'Guardo todas las cosas en su sitio',
            answerValue:'C',
            factor_id:getId('C')  }
        ],
    },
    {
        id:78,
        questionText: 'Pregunta 78',
        answerOptions: [
            {answerText:'Me gusta el trabajo que requiere detalles',
            answerValue:'D',
            factor_id:getId('D')  }, 
            {answerText:'Tardo en enfadarme',
            answerValue:'Z',
            factor_id:getId('Z')  }
        ],
    },
    {
        id:79,
        questionText: 'Pregunta 79',
        answerOptions: [
            {answerText:'Me gusta seguir a la gente que admiro',
            answerValue:'F',
            factor_id:getId('F')  }, 
            {answerText:'Siempre termino el trabajo que he empezado',
            answerValue:'N',
            factor_id:getId('N')  }

        ],
    },
    {
        id:80,
        questionText: 'Pregunta 80',
        answerOptions: [
            {answerText:'Me gustan las instrucciones claras',
            answerValue:'W',
            factor_id:getId('W')  }, 
            {answerText:'Me gusta trabajar mucho',
            answerValue:'A',
            factor_id:getId('A')  }
        ],
    },
    {
        id:81,
        questionText: 'Pregunta 81',
        answerOptions: [
            {answerText:'Persigo aquello que deseo',
            answerValue:'G',
            factor_id:getId('G')   },
            {answerText:'Soy un buen “dirigente”',
            answerValue:'L',
            factor_id:getId('L')  }
        ],
    },
    {
        id:82,
        questionText: 'Pregunta 82',
        answerOptions: [
            {answerText:'Hago que los demás trabajen mucho',
            answerValue:'L',
            factor_id:getId('L')  }, 
            {answerText:'Soy desenfadado',
            answerValue:'I',
            factor_id:getId('I')  }
        ],
    },
    {
        id:83,
        questionText: 'Pregunta 83',
        answerOptions: [
            {answerText:'Tomo decisiones rápidas',
            answerValue:'I',
            factor_id:getId('I')  }, 
            {answerText:'Hablo de prisa',
            answerValue:'T',
            factor_id:getId('T')  }
        ],
    },
    {
        id:84,
        questionText: 'Pregunta 84',
        answerOptions: [
            {answerText:'Normalmente trabajo de prisa',
            answerValue:'T',
            factor_id:getId('T')  }, 
            {answerText:'Hablo de prisa',
            answerValue:'V',
            factor_id:getId('V')  }
        ],
    },
    {
        id:85,
        questionText: 'Pregunta 85',
        answerOptions: [
            {answerText:'No me gusta conocer gente',
            answerValue:'V',
            factor_id:getId('V')  }, 
            {answerText:'Me canso enseguida',
            answerValue:'S',
            factor_id:getId('S')  }

        ],
    },
    {
        id:86,
        questionText: 'Pregunta 86',
        answerOptions: [
            {answerText:'Hago muchísimos amigos',
            answerValue:'S',
            factor_id:getId('S')  }, 
            {answerText:'Dedico mucho tiempo a pensar',
            answerValue:'R',
            factor_id:getId('R')  }
        ],
    },
    {
        id:87,
        questionText: 'Pregunta 87',
        answerOptions: [
            {answerText:'Me gusta pensar sobre teoría',
            answerValue:'R',
            factor_id:getId('R')   },
            {answerText:'Me gusta trabajar con detalles',
            answerValue:'D',
            factor_id:getId('D')  }
        ],
    },
    {
        id:88,
        questionText: 'Pregunta 88',
        answerOptions: [
            {answerText:'Me gusta trabajar con detalles',
            answerValue:'D',
            factor_id:getId('D')  }, 
            {answerText:'Me gusta organizar mi trabajo',
            answerValue:'C',
            factor_id:getId('C')  }
        ],
    },
    {
        id:89,
        questionText: 'Pregunta 89',
        answerOptions: [
            {answerText:'Pongo las cosas en su sitio',
            answerValue:'C',
            factor_id:getId('C')  }, 
            {answerText:'Siempre soy agradable',
            answerValue:'Z',
            factor_id:getId('Z')  }
        ],
    },
    {
        id:90,
        questionText: 'Pregunta 90',
        answerOptions: [
            {answerText:'Me gusta que me digan qué he de hacer',
            answerValue:'W',
            factor_id:getId('W')  }, 
            {answerText:'Tengo  que  terminar  lo  que  he empezado',
            answerValue:'N',
            factor_id:getId('N')  }
        ],
    }
    
]