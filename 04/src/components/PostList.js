import React, { Component } from 'react';

import PostItem from './PostItem';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: 'Vanessa Romero',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        date: '20 Fev 2020',
        content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
        comments: [
          {
            id: 2,
            author: {
              name: 'Diego Fernandes',
              avatar: 'https://avatars2.githubusercontent.com/u/2254731?v=4'
            },
            date: '20 Fev 2020',
            content:
              'A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)'
          }
        ]
      },
      {
        id: 3,
        author: {
          name: 'Fernando Guimarães',
          avatar: 'https://i.pravatar.cc/150?img=55'
        },
        date: '21 Mar 2020',
        content:
          'Fala galera, beleza?\nEstou fazendo o Bootcamp GoStack e está sendo muito massa! Alguém mais aí fazendo? Comenta aí na publicação para trocarmos uma idéia',
        comments: [
          {
            id: 3,
            author: {
              name: 'Priscila Trindade Fonseca',
              avatar: 'https://i.pravatar.cc/150?img=21'
            },
            date: '22 Mar 2020',
            content:
              'Que maaaaaassa! Estou pensando em me inscrever na próxima turma pra ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes'
          }
        ],
      },
      {
        id: 6,
        author: {
          name: 'Júlio Gonçalves da Silva',
          avatar: 'https://i.pravatar.cc/150?img=70'
        },
        date: '30 Jun 2020',
        content:
          'Estou fazendo o Bootcamp GoStack e está sendo desafiador! Se puderem me ajudar a tirar algumas dúvidas, ficaria grato',
        comments: [
          {
            id: 7,
            author: {
              name: 'Félix Demetrio',
              avatar: 'https://i.pravatar.cc/150?img=67'
            },
            date: '31 Jun 2020',
            content:
              'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!'
          },
          {
            id: 8,
            author: {
              name: 'Patrícia Semedo Arzila',
              avatar: 'https://i.pravatar.cc/150?img=22'
            },
            date: '31 Jun 2020',
            content:
              'Pode contar comigo, qualquer coisa só combinarmos um horário e a gente pode entrar no Discord'
          }
        ]
      }
    ]
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="postlist">
        {posts.map(post => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    );
  }
}

export default PostList;