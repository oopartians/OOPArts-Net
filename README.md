# OOPArts-Net  

**OOPArts Net 프로젝트는 '우주 최강 게임 개발 동아리 OOPArts'의 홈페이지 개발 프로젝트이다.**  
Hanyang University Game Develop Club Homepage project.

## 개발 목적 :  
- 기존의 동아리 홈페이지 (싸이월드 클럽, 네이버 카페) 서비스의 불편함 개선
- 동아리 홈페이지에 접근성 향상
- Landing 페이지를 통한 동아리 대외 홍보
- 게임 전시 페이지 개발을 통한 동아리 홍보
- 활발한 프로젝트 진행을 돕기 위한 서비스 개발
- 그 이외에, 기존 카페 서비스 (ex. naver cafe, cyworld club ..)등이 지원하지 않는 기능을 직접 만들어 적용할 수 있다.


## 프로젝트 기능 명세서 : 
   * 게임 라이브러리 서비스
      * 게임전시
         * 오파츠 소개
         * 홍보
   * 오파츠 홈페이지 서비스
      * 커뮤니티
         * 공지
         * 자유 게시판
         * 통합 게시판 (Tag system)
      * 프로젝트
         * 프로젝트 소개
         * 협업
            * 기획
            * 프로젝트 협업
               * 소통 (ex. slack) [optional]
               * issue track (ex. Trello, github, asana ..)
               * VCS (git)
         * 개발 기록
            * 경험 공유
            * 기술 공유

## Application Stack : 
Server : Nginx  
ServerSide-Platform : Node.js  
Web-Application-Framework : Express  

## Server Install : 
``` bash
$ git clone https://github.com/oopartians/OOPArts-Net.git
$ cd OOPArts-Net
$ npm install
```

## Server Run : 
``` bash
$ DEBUG=OOPArts-Net:* npm start
```

## Visual Studio Community 로 개발 환경 세팅 : 
과정이 조금 복잡하므로 구글 Document 링크 참조
https://docs.google.com/document/d/1E_9EijU8eqpjOcf6gz6aVAZk7_PD38nPSVhCABIFYsE/edit?usp=sharing
