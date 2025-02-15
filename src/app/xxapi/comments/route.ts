// app/api/comments/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(comments);
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commentaires." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { commentorId, commentorName, message } = body;

    // Validation
    if (!commentorId || !commentorName || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires.' },
        { status: 400 }
      );
    }

    // Créer un nouveau commentaire
    const newComment = await prisma.comment.create({
      data: {
        commentorId,
        commentorName,
        message,
        facebookId: "comment_id", // ID fictif pour l'instant
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error: unknown) {
    console.error("Erreur lors de l'ajout du commentaire:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout du commentaire." },
      { status: 500 }
    );
  }
}