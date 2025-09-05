import { Box, Typography, Grid, Container } from '@mui/material';
import { DocumentCard } from '../../components/common';
import { useState } from 'react';
export default function Document() {
  const [variant, setVariant] = useState('default'); // default, compact, detailed
  const Demodocuments = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      description:
        'Learn the basics of ML including supervised & unsupervised learning.',
      author: 'Dr. Nguyen Van A',
      category: 'Computer Science',
      uploadedAt: '2024-01-15',
      likes: 45,
      fileUrl: null,
      thumbnail: null,
      tags: ['AI', 'ML', 'Data Science'],
      downloads: 120,
      size: '2.3 MB',
      views: 450,
    },
    {
      id: 2,
      title: 'Linear Algebra Notes',
      description: 'Essential linear algebra concepts for beginners.',
      author: 'Dr. Tran Thi B',
      category: 'Mathematics',
      uploadedAt: '2024-02-20',
      likes: 30,
      fileUrl: null,
      thumbnail: null,
      tags: ['Algebra', 'Matrix', 'Vectors'],
      downloads: 95,
      size: '1.5 MB',
      views: 310,
    },
    {
      id: 3,
      title: 'Physics Fundamentals',
      description: 'Covers mechanics, thermodynamics, and waves.',
      author: 'Dr. Le Van C',
      category: 'Physics',
      uploadedAt: '2024-03-05',
      likes: 60,
      fileUrl: null,
      thumbnail: null,
      tags: ['Mechanics', 'Thermodynamics', 'Waves'],
      downloads: 200,
      size: '3.1 MB',
      views: 580,
    },
    {
      id: 4,
      title: 'Organic Chemistry Guide',
      description:
        'A detailed guide to organic chemistry reactions and mechanisms.',
      author: 'Dr. Pham Thi D',
      category: 'Chemistry',
      uploadedAt: '2024-04-12',
      likes: 40,
      fileUrl: null,
      thumbnail: null,
      tags: ['Organic', 'Reactions', 'Mechanisms'],
      downloads: 150,
      size: '2.8 MB',
      views: 400,
    },
    {
      id: 5,
      title: 'Biology Lab Manual',
      description: 'Practical experiments for cell biology and genetics.',
      author: 'Dr. Hoang Van E',
      category: 'Biology',
      uploadedAt: '2024-05-01',
      likes: 35,
      fileUrl: null,
      thumbnail: null,
      tags: ['Cells', 'Genetics', 'Experiments'],
      downloads: 110,
      size: '1.9 MB',
      views: 290,
    },
  ];

  const handleDocumentClick = (document) => {
    console.log('Document clicked:', document);
    // Sẽ navigate đến document detail page
  };
  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Document Cards Demo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reusable DocumentCard component với các variant khác nhau
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {Demodocuments.map((document) => (
          <Grid
            size={
              { xs: 12, sm: 6, md: 4, lg: 1.5 } // default: 8 cột desktop
            }
            key={document.id}
          >
            <DocumentCard
              document={document}
              variant={variant} // ← dùng state variant chung
              onClick={handleDocumentClick}
              showReadMore={variant !== 'compact'}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
